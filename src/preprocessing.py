import pandas as pd
from sklearn.model_selection import train_test_split

def load_data(path):
    return pd.read_csv(path)

def preprocess(df):
    X = df.drop('Churn', axis=1)
    y = df['Churn'].map({'No':0, 'Yes':1})

    X = pd.get_dummies(X, drop_first=True)

    return X, y

def split_data(X, y, test_size=0.2):
    return train_test_split(
        X, y, test_size=test_size, random_state=42, stratify=y
    )
