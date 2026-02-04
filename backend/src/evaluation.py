from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

def evaluate_models(models, X_test, y_test,X_train,y_train):
    results = []

    for name, model in models.items():
        y_pred = model.predict(X_test)
        y_train_pred=model.predict(X_train)

        # print("Evaluation metrics of the training model : ")

        # results.append({
        #     "Model": name,
        #     "Accuracy": accuracy_score(y_train, y_train_pred),
        #     "Recall": recall_score(y_train, y_train_pred),
        #     "Precision": precision_score(y_train, y_train_pred),
        #     "F1": f1_score(y_train, y_train_pred)
        # })

        # print("Evaluation metrics of the trained model : ")

        results.append({
            "Model": name,
            "Accuracy": accuracy_score(y_test, y_pred),
            "Recall": recall_score(y_test, y_pred),
            "Precision": precision_score(y_test, y_pred),
            "F1": f1_score(y_test, y_pred)
        })

    return results
