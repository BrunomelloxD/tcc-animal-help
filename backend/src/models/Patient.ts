import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    JoinColumn
} from 'typeorm'

import ImagePatient from './ImagePatient'
import Ongs from './Ongs'
@Entity('patients')
export default class Patients {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column()
    description: string

    // IMAGENS
    @OneToMany(() => ImagePatient, image => image.patient, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'ong_id' })
    images: ImagePatient[]

    // ONG
    // @OneToMany(() => Ongs, ong => ong.id, {
    //     cascade: ['insert', 'update']
    // })
    // @JoinColumn({ name: 'ong_id' })
    // ong: Ongs[]
}
