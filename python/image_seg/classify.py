import cv2
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import time
import os
from PIL import Image # Import Pillow
import shutil       # Import shutil
from term_image.image import AutoImage # Import term-image

# --- CPU Optimization: Force TensorFlow to use CPU ---
# ... (keep the CPU setup code as before) ...
print("Attempting to configure TensorFlow for CPU-only execution.")
try:
    tf.config.set_visible_devices([], 'GPU')
    logical_devices = tf.config.list_logical_devices('CPU')
    print(f"TensorFlow configured for CPU. Logical CPU devices: {logical_devices}")
except Exception as e:
    print(f"Could not force CPU-only execution. Error: {e}")
    if not tf.config.list_physical_devices('GPU'):
        print("No GPU detected. TensorFlow will use CPU.")
    else:
         print("Warning: GPU detected, but CPU execution was requested.")


# Load the trained model
# ... (keep the model loading code as before) ...
print("Loading Keras model...")
try:
    model_path = "predictWaste12.h5"
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found at: {model_path}")
    model = load_model(model_path)
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    exit()

# Define class labels
output_class = ["battery", "biological", "brown-glass", "cardboard", "clothes", "green-glass", "metal", "paper", "plastic", "shoes", "trash", "white-glass"]

# Mapping Function
def map_to_biodegradability(original_class):
    biodegradable_classes = ["biological", "cardboard", "paper"]
    if original_class in biodegradable_classes:
        return "Biodegradable"
    else:
        return "Non-Biodegradable"

# Define the color for the selection mask
selection_color = (255, 0, 0)  # Blue color (BGR format)

# Preprocessing, Prediction, Segmentation, Masking functions
# ... (keep preprocess_image_for_model, predict_on_image,
#      segment_largest_object, apply_visual_mask functions as before) ...
def preprocess_image_for_model(image):
    img_size = 224
    resized_image = cv2.resize(image, (img_size, img_size), interpolation=cv2.INTER_AREA)
    img_array = np.expand_dims(resized_image, axis=0)
    return img_array / 255.0

def predict_on_image(image):
    if image is None or image.size == 0:
        return "Unknown", 0.0
    preprocessed_image = preprocess_image_for_model(image)
    prediction = model.predict(preprocessed_image)
    predicted_class_index = np.argmax(prediction[0])
    confidence = prediction[0][predicted_class_index]
    if predicted_class_index < len(output_class):
        predicted_class = output_class[predicted_class_index]
    else:
        predicted_class = "Unknown Index"
        confidence = 0.0
    return predicted_class, confidence

def segment_largest_object(frame):
    if frame is None: return None, None, None
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (7, 7), 0)
    thresh = cv2.adaptiveThreshold(blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                   cv2.THRESH_BINARY_INV, 15, 3)
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if not contours: return None, None, None
    largest_contour = max(contours, key=cv2.contourArea)
    min_contour_area = 200
    if cv2.contourArea(largest_contour) > min_contour_area:
        mask = np.zeros(frame.shape[:2], dtype=np.uint8)
        cv2.drawContours(mask, [largest_contour], -1, 255, -1)
        x, y, w, h = cv2.boundingRect(largest_contour)
        return mask, largest_contour, (x, y, w, h)
    else:
        return None, None, None

def apply_visual_mask(frame, mask, color):
    if mask is None: return frame
    color_mask_overlay = np.zeros_like(frame)
    color_mask_overlay[mask > 0] = color
    masked_frame = cv2.addWeighted(frame, 1.0, color_mask_overlay, 0.4, 0)
    return masked_frame

# --- MODIFIED: Classification function ---
def classify_single_image_terminal(image_path, max_term_width=None):
    """
    Performs classification, maps to biodegradability, and displays results
    (including image) in the terminal.
    """
    start_total_time = time.time()
    print(f"\nProcessing image: {image_path}")

    frame = cv2.imread(image_path)
    if frame is None:
        print(f"Error: Could not read image at {image_path}")
        return

    print("Segmenting object...")
    segment_start = time.time()
    mask, contour, bbox = segment_largest_object(frame)
    segment_time = time.time() - segment_start
    print(f"Segmentation time: {segment_time:.4f}s")

    display_frame_cv = frame.copy() # Work on a copy

    prediction_text = "Prediction: None" # Default text

    if bbox is not None:
        x, y, w, h = bbox
        print(f"Object detected at bbox: ({x}, {y}, {w}, {h})")
        object_region = frame[y:y+h, x:x+w]

        if object_region.size > 0:
            print("Running prediction...")
            predict_start = time.time()
            predicted_class, confidence = predict_on_image(object_region)
            predict_time = time.time() - predict_start
            print(f"Prediction time: {predict_time:.4f}s")

            biodegradability = map_to_biodegradability(predicted_class)

            prediction_text = f"{biodegradability} ({predicted_class} - {confidence:.2f})"
            print(f"  -> Result: {prediction_text}")

            # --- Prepare Display Frame (for terminal) ---
            # Optional: Apply visual mask
            display_frame_cv = apply_visual_mask(display_frame_cv, mask, selection_color)
            # Draw bounding box
            cv2.rectangle(display_frame_cv, (x, y), (x + w, y + h), (0, 255, 0), 2)
            # Add text label (adjust position if needed)
            label_y = y - 10 if y > 20 else y + h + 20 # Position label above or below
            cv2.putText(display_frame_cv, f"{biodegradability} ({confidence:.2f})",
                        (x, label_y), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

        else:
            print("Warning: Bounding box resulted in an empty image crop.")
            prediction_text = "Prediction: Empty Crop"

    else:
        print("No significant object found in the image.")
        prediction_text = "Prediction: No object detected"
        # Optionally add text to the image even if no object detected
        cv2.putText(display_frame_cv, "No object detected", (20, 40),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)


    # --- Terminal Display Logic ---
    print("\n--- Terminal Image Output ---")
    try:
        # Convert OpenCV image (BGR) to PIL image (RGB)
        display_frame_rgb = cv2.cvtColor(display_frame_cv, cv2.COLOR_BGR2RGB)
        pil_image = Image.fromarray(display_frame_rgb)

        # Create term-image object
        term_img = AutoImage(pil_image)

        # Resize for terminal (optional but recommended)
        try:
            term_width, _ = shutil.get_terminal_size()
            if max_term_width: # User specified max width
                 term_width = min(term_width, max_term_width)
            # Set width, height will be calculated based on aspect ratio by term-image
            # We multiply by 2 because block characters are often wider than tall
            term_img.set_size(width=min(term_width, pil_image.width * 2))
        except OSError:
            print("Could not get terminal size. Using default image size (might be large).")
            if max_term_width:
                 term_img.set_size(width=min(max_term_width, pil_image.width * 2))


        # Draw the image to terminal
        term_img.draw()

        print("--- End Terminal Image Output ---")

    except ImportError:
        print("\n[Warning] `term-image` or `Pillow` not installed.")
        print("Install them (`pip install term-image Pillow shutil`) to display images in the terminal.")
        print(f"Prediction Result Text: {prediction_text}") # Show text fallback
    except Exception as e:
        print(f"\n[Error] Failed to render image in terminal: {e}")
        print(f"Prediction Result Text: {prediction_text}") # Show text fallback


    total_time = time.time() - start_total_time
    print(f"\nTotal processing time: {total_time:.4f}s")

# --- Example Usage ---
# image_path = r"uploads/card.jpg"
image_path = "uploads/trash.jpeg" # Make sure this path is correct

if os.path.exists(image_path):
    # You can optionally limit the width in characters
    classify_single_image_terminal(image_path, max_term_width=100)
else:
    print(f"Error: Input image file not found at '{image_path}'")
