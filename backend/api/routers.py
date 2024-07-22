# api/routers.py
'''
class UserRouter:
    """
    A router to control database operations for models in the 'api' app,
    with specific rules for the CustomUser model to use the 'user_db'.
    Other models will default to the 'default' database.
    """

    def db_for_read(self, model, **hints):
        """
        Routes read operations for CustomUser model to 'user_db'.
        Other models in the 'api' app use the 'default' database.
        """
        if model._meta.app_label == 'api' and model._meta.model_name == 'customuser':
            return 'user_db'
        return 'default'

    def db_for_write(self, model, **hints):
        """
        Routes write operations for CustomUser model to 'user_db'.
        Other models in the 'api' app use the 'default' database.
        """
        if model._meta.app_label == 'api' and model._meta.model_name == 'customuser':
            return 'user_db'
        return 'default'

    def allow_relation(self, obj1, obj2, **hints):
        """
        Allows any relation if both objects are from the 'api' app.
        Explicitly allows relations involving ContentType from any app.
        """
        if (obj1._meta.app_label == 'api' and obj2._meta.app_label == 'api') or \
           (obj1._meta.model_name == 'contenttype' or obj2._meta.model_name == 'contenttype'):
            return True
        return None  # Defer to Django's default relation permission handling for other cases

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Controls migrations such that the CustomUser model only migrates to 'user_db'.
        All other models in the 'api' app migrate to the 'default' database.
        """
        if app_label == 'api':
            if model_name == 'customuser':
                return db == 'user_db'
            return db == 'default'
        return None  # Defer to other routers or the default router for apps not within 'api'
'''

'''
class UserRouter:
    """
    A router to control database operations for the CustomUser model within the
    api application, ensuring it uses a separate database.
    """

    def db_for_read(self, model, **hints):
        """
        Directs read operations for CustomUser model to 'user_db'.
        """
        if model._meta.app_label == 'api' and model._meta.model_name == 'customuser':
            return 'user_db'
        return 'default'  # Ensures other models in the 'api' app use the default database

    def db_for_write(self, model, **hints):
        """
        Directs write operations for CustomUser model to 'user_db'.
        """
        if model._meta.app_label == 'api' and model._meta.model_name == 'customuser':
            return 'user_db'
        return 'default'  # Ensures other models in the 'api' app use the default database

    def allow_relation(self, obj1, obj2, **hints):
        """
        Allows relations within the 'api' app and between 'api' app models and models of other apps.
        """
        if obj1._meta.app_label == 'api' and obj2._meta.app_label == 'api':
            return True
        return None  # Allow Django to decide on relations involving models outside the 'api' app

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Controls migration such that the CustomUser model only migrates to 'user_db'.
        """
        if app_label == 'api':
            if model_name == 'customuser':
                return db == 'user_db'
            return db == 'default'  # All other models in the 'api' app migrate to the default database
        return None  # Allow migrations for other apps to default settings
'''

class UserRouter:
    def db_for_read(self, model, **hints):
        if model.__name__ == 'CustomUser':
            return 'user_db'
        return 'default'  # Returning None leaves the decision to other routers or the default database

    def db_for_write(self, model, **hints):
        if model.__name__ == 'CustomUser':
            return 'user_db'
        return 'default'

    def allow_relation(self, obj1, obj2, **hints):
        # Allow any relation if both models are from the api app
        if obj1._meta.app_label == 'api' and obj2._meta.app_label == 'api':
            return True
        return 'default'

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label == 'api':
            if model_name == 'customuser':
                return db == 'user_db'
        return db == 'default'

'''
class UserRouter:
    """
    A router to control all database operations on models in the
    auth application (CustomUser).
    """

    def db_for_read(self, model, **hints):
        """
        Attempts to read CustomUser models go to user_db.
        """
        if model._meta.app_label == 'api':  # Replace 'api' with your actual app name
            return 'user_db'
        return 'default'

    def db_for_write(self, model, **hints):
        """
        Attempts to write CustomUser models go to user_db.
        """
        if model._meta.app_label == 'api':  # Replace 'api' with your actual app name
            return 'user_db'
        return 'default'

    def allow_relation(self, obj1, obj2, **hints):
        """
        Allow relations if a model in the CustomUser app is involved.
        """
        if obj1._meta.app_label == 'api' or \
                obj2._meta.app_label == 'api':  # Replace 'api' with your actual app name
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Ensure the CustomUser model only appears in the 'user_db'
        database.
        """
        if app_label == 'api':  # Replace 'api' with your actual app name
            return db == 'user_db'
        return db == 'default'
    
'''