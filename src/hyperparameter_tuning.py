from sklearn.model_selection import GridSearchCV
from sklearn.linear_model import LogisticRegression

def tune_logistic(X_train, y_train):

    param_grid = {
        'C': [0.01, 0.1, 1, 10, 100],
        'penalty': ['l1', 'l2'],
        'solver': ['liblinear']
    }

    model = LogisticRegression(
        class_weight='balanced',
        max_iter=1000
    )

    grid = GridSearchCV(
        model,
        param_grid,
        scoring='f1',
        cv=5,
        n_jobs=-1
    )

    grid.fit(X_train, y_train)

    return grid.best_estimator_, grid.best_params_
