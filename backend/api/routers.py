class CustomUserRouter:
    """
    A router to control all database operations on models in the
    'api' application for the CustomUser model.
    """

    def db_for_read(self, model, **hints):
        """
        Attempts to read CustomUser models go to user_db.
        """
        if model._meta.app_label == 'api' and model._meta.model_name == 'customuser':
            return 'user_db'
        return 'default'

    def db_for_write(self, model, **hints):
        """
        Attempts to write CustomUser models go to user_db.
        """
        if model._meta.app_label == 'api' and model._meta.model_name == 'customuser':
            return 'user_db'
        return 'default'

    def allow_relation(self, obj1, obj2, **hints):
        """
        Allow relations if a model in the api app is involved.
        """
        if obj1._meta.app_label == 'api' or obj2._meta.app_label == 'api':
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Make sure the CustomUser model only appears in the 'user_db'
        database.
        """
        if app_label == 'api' and model_name == 'customuser':
            return db == 'user_db'
        return db == 'default'
