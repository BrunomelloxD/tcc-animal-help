import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    JoinColumn
} from 'typeorm'

import ImagePatient from './ImagePatient'

@Entity('patients')
export default class Patients {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @OneToMany(() => ImagePatient, image => image.patient, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'ong_id' })
    images: ImagePatient[]
}
