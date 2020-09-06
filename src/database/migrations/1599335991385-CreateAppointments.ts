import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAppointments1599335991385 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //Criar tabela no BD
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                    }, 
                    {
                        name: 'provider',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'date',
                        type: 'timestamp with time zone',
                        isNullable: false,
                    },
                ],
            }),
        );
            
            
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Desfazer o que foi criando no metodo up
        await queryRunner.dropTable('appointments');
    }

}
