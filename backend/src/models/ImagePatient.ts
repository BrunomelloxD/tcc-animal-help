// Representação da tabela como uma classe
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

import Patient from './Patient'

@Entity('imagesPatient')
export default class ImagesPatient {
  @PrimaryGeneratedColumn('increment')
  id: Number;

  @Column()
  path: string;

  /**
   * Campo não existe no BD, é somente para realizar o relacionamento
   * 
   * Após receber a ong, qual o campo da ong que vai ter as imagens (será o campo images)
   */
  @ManyToOne(() => Patient, patient => patient.images)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;
}