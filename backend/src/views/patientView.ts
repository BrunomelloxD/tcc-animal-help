import Patients from '../models/Patient';
import imagesPatientView from './imagesPatientView';

export default {
  // Função para retorno de dados para uma ong
  render(patient: Patients) {
    return {
      id: patient.id,
      name: patient.name,
      description: patient.description,
      image: imagesPatientView.renderMany(patient.images) 
    }
  },
  /**
   * Função para retorno de dados de várias ong's
   * 
   * this.render(ong) = reaproveitando os dados já passados da função de cima
   * */ 
  renderMany(patients: Patients[]) {
    return patients.map(ong => this.render(ong))
  }
}