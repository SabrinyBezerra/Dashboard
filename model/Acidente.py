#classe Acidente com todos os atributos da tabela, importadados do Bnaco de Dados
class Acidente():
    def __init__(self, id, pesid, data_inversa, dia_semana, horario, uf, br, km, municipio, causa_principal,  causa_acidente, ordem_tipo_acidente, tipo_acidente, classificacao_acidente, fase_dia, sentido_via, condicao_metereologica, tipo_pista, tracado_via, uso_solo, id_veiculo, tipo_veiculo, marca, ano_fabricacao_veiculo, tipo_envolvido, estado_fisico, idade, sexo, ilesos, feridos_leves, feridos_graves, mortos, latitude, longitude):
        self.id = id
        self.pesid = pesid
        self.data_inversa = data_inversa
        self.dia_semana = dia_semana
        self.horario = horario
        self.uf = uf
        self.br = br
        self.km = km
        self.municipio = municipio
        self.causa_principal = causa_principal
        self.causa_acidente = causa_acidente
        self.ordem_tipo_acidente = ordem_tipo_acidente
        self.tipo_acidente = tipo_acidente
        self.classificacao_acidente = classificacao_acidente
        self.fase_dia = fase_dia
        self.sentido_via = sentido_via
        self.condicao_metereologica = condicao_metereologica
        self.tipo_pista = tipo_pista
        self.tracado_via = tracado_via
        self.uso_solo = uso_solo
        self.id_veiculo = id_veiculo
        self.tipo_veiculo = tipo_veiculo
        self.marca = marca
        self.ano_fabricacao_veiculo = ano_fabricacao_veiculo
        self.tipo_envolvido = tipo_envolvido
        self.estado_fisico = estado_fisico
        self.idade = idade
        self.sexo = sexo
        self.ilesos = ilesos
        self.feridos_leves = feridos_leves
        self.feridos_graves = feridos_graves
        self.mortos = mortos
        self.latitude = latitude
        self.longitude = longitude
