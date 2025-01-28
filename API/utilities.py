
import pandas as pd

# Function to clean and scale data
def process_data(data):

    # Convert raw data to Pandas DataFrame
    user_data = pd.DataFrame(data, index = [0])

    #Data pre-processing step-by step

    # 1. Ajustamos "subgrade"
    # Creamos un diccionario
    mapeo_subgrade = { 'A1': 1, 'A2': 2, 'A3': 3, 'A4': 4, 'A5': 5,
                       'B1': 6, 'B2': 7, 'B3': 8, 'B4': 9, 'B5': 10,
                       'C1': 11, 'C2': 12, 'C3': 13, 'C4': 14, 'C5': 15,
                       'D1': 16, 'D2': 17, 'D3': 18, 'D4': 19, 'D5': 20,
                       'E1': 21, 'E2': 22, 'E3': 23, 'E4': 24, 'E5': 25,
                       'F1': 26, 'F2': 27, 'F3': 28, 'F4': 29, 'F5': 30,
                       'G1': 31, 'G2': 32, 'G3': 33, 'G4': 34, 'G5': 35
    }
    
    # Mapeamos los "subgrades" a sus valores numéricos
    user_data["sub_grade"] = user_data["sub_grade"].map(mapeo_subgrade)
    
    # 2. Ajustamos "home_ownership"
    # Creamos un diccionario
    mapeo_house = { 'MORTGAGE': 0,
                    'OWN': 2,
                    'other': 1  # Asignamos un valor por defecto a las demás categorías
    }
    
    # Mapeamos las categorías a sus valores numéricos
    user_data["home_ownership"] = user_data["home_ownership"].map(mapeo_house).fillna(1)
    
    # 3. Ajustamos "purpose"
    # Creamos un diccionario
    mapeo_purpose = { "debt_consolidation": 0, "credit_card": 1,
                      "home_improvement": 2, "other": 3, "major_purchase": 4,
                      "small_business": 5, "car": 6, "medical": 7, "moving": 8,
                      "vacation": 9, "house": 10, "wedding": 11,
                      "renewable_energy": 12, "educational": 13
    }
    
    # Mapeamos los "purpose" a sus valores numéricos
    user_data["purpose"] = user_data["purpose"].map(mapeo_purpose)

    # Return the model's prediction probability
    return user_data