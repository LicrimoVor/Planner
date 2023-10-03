import csv
import os

from django.core.management.base import BaseCommand

from task.models import StatusModel, TagModel
from planer.settings import BASE_DIR


PATH_DATA = BASE_DIR.parent.joinpath("data")

dict_model = {
    "status": StatusModel,
    "tag": TagModel,
}


class Command(BaseCommand):
    help = 'Importing default data into a database.'

    def add_arguments(self, parser):
        parser.add_argument(
            '-m',
            '--model',
            type=str,
            help='Выберете модель интеграции',
            choices=("status", "tag", "all"),
            default="all",
        )

    def handle(self, *args, **options):

        def import_data(name_model: str):
            path_model = PATH_DATA.joinpath(name_model+".csv")
            model = dict_model[name_model]
            model_list = []
            with open(path_model) as file:
                file = csv.DictReader(file, delimiter=",")
                for dict_field in file:
                    if model.objects.filter(**dict_field):
                        continue
                    inst_model = model(**dict_field)
                    model_list.append(inst_model)
            model.objects.bulk_create(model_list)

        if options['model'] == "all":
            files_list = os.listdir(PATH_DATA)
            for name_model in files_list:
                import_data(name_model[:-4])
        else:
            name_model = options['model']
            import_data(name_model)
        print("Импорт выполнен успешно!")
