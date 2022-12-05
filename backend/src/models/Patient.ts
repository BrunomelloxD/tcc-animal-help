import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    JoinColumn,
    OneToOne,
    ManyToOne
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

    @Column({ name: 'ong_id' })
    ongId: number

    @ManyToOne(() => Ongs, ong => ong.patients)
    @JoinColumn({ name: 'ong_id' })
    ong: Ongs
}
