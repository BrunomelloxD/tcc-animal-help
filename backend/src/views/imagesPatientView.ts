import ImagesPatient from "../models/ImagePatient"

export default {
  // Função para retorno de dados para uma ong
  render(image: ImagesPatient) {
    return {
      id: image.id,
      url: `http://192.168.0.110:3000/uploads/${image.path}`
    }
  },
  /**
   * Função para retorno de dados de várias ong's
   * 
   * this.render(ong) = reaproveitando os dados já passados da função de cima
   * */ 
  renderMany(images: ImagesPatient[]) {
    return images.map(image => this.render(image))
  }
}