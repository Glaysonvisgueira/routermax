# Generated by Django 2.1.3 on 2019-04-01 15:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cadastro',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100, verbose_name='Nome')),
                ('slug', models.SlugField(verbose_name='Código do carro')),
                ('description', models.TextField(blank=True, verbose_name='Descrição')),
                ('about', models.TextField(blank=True, verbose_name='Observações da Frota')),
                ('start_data', models.DateField(blank=True, null=True, verbose_name='Data de início')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Criado em')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Atualizado em')),
            ],
            options={
                'verbose_name': 'Cadastro',
                'verbose_name_plural': 'Cadastros',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Carros',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('modelo', models.CharField(max_length=30, verbose_name='Modelo')),
                ('codigo', models.CharField(max_length=4, verbose_name='Código do automóvel')),
                ('ano', models.CharField(max_length=4, verbose_name='Ano')),
            ],
            options={
                'verbose_name': 'Carro',
                'verbose_name_plural': 'Carros',
                'ordering': ['modelo'],
            },
        ),
        migrations.CreateModel(
            name='Motorista',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nome', models.CharField(max_length=100, verbose_name='Nome:')),
                ('apelido', models.CharField(default='', max_length=50, verbose_name='Apelido:')),
                ('slug', models.SlugField(verbose_name='Código do motorista:')),
                ('rg', models.CharField(max_length=13, verbose_name='RG')),
                ('data_espedicao_rg', models.DateTimeField(blank=True, verbose_name='Data de expedição do RG:')),
                ('cpf', models.CharField(max_length=11, verbose_name='CPF')),
                ('nascimento', models.DateTimeField(blank=True, verbose_name='Data de nascimento:')),
                ('codigo', models.CharField(default='', max_length=4, verbose_name='Código:')),
                ('num_cnh', models.CharField(default='', max_length=11, verbose_name='Número de registro:')),
                ('emissao_cnh', models.DateTimeField(blank=True, verbose_name='Data de emissão da CNH:')),
                ('validade_habilitacao', models.DateTimeField(blank=True, verbose_name='Validade da habilitação:')),
                ('categoria', models.CharField(default='', max_length=2, verbose_name='Categoria:')),
                ('endereco', models.CharField(default='', max_length=120, verbose_name='Endereço:')),
                ('complemento', models.CharField(blank=True, default='', max_length=120, verbose_name='Complemento:')),
                ('bairro', models.CharField(default='', max_length=40, verbose_name='Bairro:')),
                ('cep', models.CharField(default='', max_length=8, verbose_name='CEP:')),
                ('cidade', models.CharField(default='', max_length=30, verbose_name='Cidade:')),
                ('uf', models.CharField(choices=[('PI', 'PI'), ('MA', 'MA'), ('AC', 'AC'), ('AL', 'AL'), ('AM', 'AM'), ('AP', 'AP'), ('BA', 'BA'), ('ES', 'ES'), ('CE', 'CE'), ('GO', 'GO'), ('MT', 'MT'), ('MS', 'MS'), ('MG', 'MG'), ('PA', 'PA'), ('PB', 'PB'), ('PR', 'PR'), ('PE', 'PE'), ('RJ', 'RJ'), ('RN', 'RN'), ('RS', 'RS'), ('RO', 'RO'), ('RR', 'RR'), ('SC', 'SC'), ('SP', 'SP'), ('SE', 'SE'), ('TO', 'TO')], default='', max_length=2, verbose_name='UF:')),
                ('contato1', models.CharField(blank=True, default='', max_length=11, verbose_name='Contato:')),
                ('contato2', models.CharField(blank=True, default='', max_length=11, verbose_name='Contato adicional:')),
                ('status', models.CharField(choices=[('ATIVO', 'ATIVO'), ('INATIVO', 'INATIVO')], default='', max_length=7, verbose_name='Status:')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Cadastrado em;')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Cadastro atualizado em:')),
            ],
            options={
                'verbose_name': 'Motorista',
                'verbose_name_plural': 'Motoristas',
                'ordering': ['codigo'],
            },
        ),
        migrations.CreateModel(
            name='PontosDeVisitas',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('cliente', models.CharField(max_length=120, verbose_name='Cliente:')),
                ('cpf', models.CharField(max_length=11, verbose_name='CPF:')),
                ('endereco', models.CharField(max_length=120, verbose_name='Endereço:')),
                ('complemento', models.CharField(blank=True, max_length=120, verbose_name='Complemento:')),
                ('bairro', models.CharField(max_length=40, verbose_name='Bairro:')),
                ('cep', models.CharField(max_length=8, verbose_name='CEP:')),
                ('cidade', models.CharField(max_length=30, verbose_name='Cidade:')),
                ('uf', models.CharField(choices=[('PI', 'PI'), ('MA', 'MA'), ('AC', 'AC'), ('AL', 'AL'), ('AM', 'AM'), ('AP', 'AP'), ('BA', 'BA'), ('ES', 'ES'), ('CE', 'CE'), ('GO', 'GO'), ('MT', 'MT'), ('MS', 'MS'), ('MG', 'MG'), ('PA', 'PA'), ('PB', 'PB'), ('PR', 'PR'), ('PE', 'PE'), ('RJ', 'RJ'), ('RN', 'RN'), ('RS', 'RS'), ('RO', 'RO'), ('RR', 'RR'), ('SC', 'SC'), ('SP', 'SP'), ('SE', 'SE'), ('TO', 'TO')], max_length=2, verbose_name='UF:')),
            ],
            options={
                'verbose_name': 'Ponto de visita',
                'verbose_name_plural': 'Pontos de visitas',
                'ordering': ['bairro'],
            },
        ),
        migrations.CreateModel(
            name='Zonas',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('zona', models.CharField(default='', max_length=10, verbose_name='Zona:')),
                ('cidade', models.CharField(default='', max_length=40, verbose_name='Cidade:')),
                ('uf', models.CharField(default='', max_length=2, verbose_name='UF:')),
            ],
            options={
                'verbose_name': 'Zona',
                'verbose_name_plural': 'Zonas',
                'ordering': ['id'],
            },
        ),
    ]
