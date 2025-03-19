def convert_tokens_to_cash(tokens: int, country: str) -> float:
    """
    Converts tokens to cash based on the user's country.
    
    Parameters:
    - tokens (int): Number of tokens to convert.
    - country (str): The country for exchange rate reference.

    Returns:
    - float: Equivalent cash amount in local currency.
    """

    # Define country-specific token exchange rates (1 token = X currency units)
    exchange_rates = {
        "USA": 0.05,      # 1 token = $0.05
        "India": 4.0,     # 1 token = ₹4
        "UK": 0.04,       # 1 token = £0.04
        "EU": 0.045,      # 1 token = €0.045
        "Japan": 7.5,     # 1 token = ¥7.5
        "Australia": 0.06 # 1 token = AUD 0.06
    }

    # Get exchange rate, default to USD if country not found
    rate = exchange_rates.get(country, 0.05)

    # Convert tokens to cash
    cash_value = round(tokens * rate, 2)  # Round to 2 decimal places

    return cash_value

# Example Usage
tokens = 100
country = "India"
cash = convert_tokens_to_cash(tokens, country)
print(f"Tokens: {tokens} → Cash in {country}: {cash}")
