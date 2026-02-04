from src.preprocessing import load_data, preprocess, split_data
from src.modeling import get_models, train_models
from src.evaluation import evaluate_models
import pandas as pd
from src.hyperparameter_tuning import tune_logistic
from sklearn.metrics import classification_report


df = load_data('D:\ML Practice\ChurnPrediction\backend\data\clean_data.csv')

X, y = preprocess(df)
X_train, X_test, y_train, y_test = split_data(X, y)

models = get_models()
trained_models = train_models(models, X_train, y_train)

results = evaluate_models(trained_models, X_test, y_test,X_train,y_train)

results_df = pd.DataFrame(results)
print(results_df.columns)
print(results_df.sort_values(by="F1", ascending=False))

best_model, best_params = tune_logistic(X_train, y_train)

print("Best tuned parameters:", best_params)

y_pred = best_model.predict(X_test)
print(classification_report(y_test, y_pred))

