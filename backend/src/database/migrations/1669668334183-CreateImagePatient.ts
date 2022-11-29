import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateImagePatient1669668334183 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'imagesPatient',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'path',
                    type: 'varchar'
                },
                {
                    name: 'patient_id',
                    type: 'integer'
                }

            ],
            foreignKeys: [
                {
                    name: 'ImagesPatient',
                    columnNames: ['patient_id'],
                    referencedTableName: 'patients',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('imagesPatient');
    }

}
