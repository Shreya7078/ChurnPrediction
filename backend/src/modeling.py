from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier,AdaBoostClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
from xgboost import XGBClassifier

def get_models():
    return {
        "Logistic": LogisticRegression(max_iter=1000, class_weight='balanced'),
        "DecisionTree": DecisionTreeClassifier(class_weight='balanced'),
        "RandomForest": RandomForestClassifier(class_weight='balanced'),
        "GradientBoost": GradientBoostingClassifier(),
        "SVM": SVC(class_weight='balanced'),
        'AdaBoost': AdaBoostClassifier(),
        'XGBoost': XGBClassifier(),
    }

def train_models(models, X_train, y_train):
    trained = {}
    for name, model in models.items():
        model.fit(X_train, y_train)
        trained[name] = model
    return trained
