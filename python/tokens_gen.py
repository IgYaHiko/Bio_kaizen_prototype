def generate_tokens(waste_type: str, weight: float) -> int:
    """
    Generates tokens based on waste type and weight.
    
    Parameters:
    - waste_type (str): Type of waste (e.g., "bio", "non-bio", "recyclable").
    - weight (float): Weight of waste in kilograms.

    Returns:
    - int: Number of tokens awarded.
    """

    # Define token multipliers for each waste type
    waste_multipliers = {
        "bio": 1.2,         # Organic waste has medium value
        "non-bio": 0.8,     # Non-biodegradable waste has lower value
        "recyclable": 1.5   # Recyclable waste has the highest value
    }

    # Ensure valid waste type, else default to non-bio
    multiplier = waste_multipliers.get(waste_type.lower(), 0.8)

    # Base token calculation (scaling factor applied)
    tokens = round(multiplier * weight * 10)  # Scale weight impact

    return max(tokens, 1)  # Ensure at least 1 token is awarded

# Example Usage
waste_type = "recyclable"
weight = 2.5  # 2.5 kg of recyclable waste
tokens = generate_tokens(waste_type, weight)
print(f"Tokens awarded: {tokens}")
