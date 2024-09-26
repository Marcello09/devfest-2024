import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const HOST = 'http://127.0.0.1:5001/moreira-devfest-2024/us-central1/api'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  listarSalas() {
    return this.http.get(HOST + '/sala')
  }
  
  criarSala(nome: string, max_pessoas: number) {
    return this.http.post(HOST + '/sala', {nome, max_pessoas})
  }

  deletarSala(id: string) {
    return this.http.delete(HOST + '/sala/' + id)
  }

  addPessoaOnce(sala: string, pessoa: string) {
    console.log('Not Implemented Yet!')
  }

}
