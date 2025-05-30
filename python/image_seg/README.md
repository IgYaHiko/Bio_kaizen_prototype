# Garbage Classification System

A machine learning system that classifies different types of waste materials into categories. It's built on TensorFlow and leverages the VGG16 model architecture for image classification.


## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Features

- **VGG16 Model Architecture**: The project utilizes the power of the pre-trained VGG16 model for image classification.
  
- **12 Waste Categories**: Classify waste into 12 distinct categories including cardboard, metal, paper, and more.
  
- **Image Augmentation**: Uses `ImageDataGenerator` for real-time data augmentation.

- **Visual Predictions**: Provides a visual representation of predictions using Matplotlib.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/IgYaHiko/Bio_kaizen_prototype.git
    ```

2. Navigate to the cloned repository:
    ```bash
    cd Bio_kaizen_prototype/python/image_seg
    ```

3. Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

## Usage

1. **Running the Notebook**:
    - Ensure you have Jupyter Notebook or Jupyter Lab installed. If not, install it:
      ```bash
      pip install jupyterlab
      ```

    - Launch Jupyter:
      ```bash
      jupyter lab
      ```

    - Navigate to the project notebook and run the cells to either train the model or make predictions.

2. **Classifying Waste**:
    - Use the `waste_prediction` function within the notebook to classify waste by providing the path to your image.

## Model

The trained model is saved as `predictWaste12.h5` and can be loaded using TensorFlow/Keras for further predictions or improvements.

## Prediction

![image](https://github.com/user-attachments/assets/c16d0c04-7eea-4224-972c-76b7467391ac)


