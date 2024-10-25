import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from '../environments/environment';

const HOST = environment.API_HOST

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  leituras: any = {}

  constructor(private http: HttpClient) { }

  listarSalas() {
    return this.http.get(HOST + '/sala')
  }
  
  criarSala(nome: string, max_pessoas: number) {
    return this.http.post(HOST + '/sala', {nome, max_pessoas})
  }

  deletarSala(id: string) {
    return this.http.delete(HOST + '/sala/' + id, {observe: 'body'})
  }

  esvaziarSala(sala_id: string) {
    return this.http.delete(`${HOST}/sala/${sala_id}/esvaziar`)
  }

  removerPessoa(sala_id: string) {
    return this.http.delete(`${HOST}/sala/${sala_id}/pessoa`)
  }

  removerPessoas(id: any, quantidade: number) {
    return this.http.delete(`${HOST}/sala/${id}/pessoa?quantidade=${quantidade}`)
  }
  
  adicionarPessoaUmaVez(sala: string, pessoa_id: string) {
    if (!this.leituras[pessoa_id]) {
      console.log(`Adiciona ${pessoa_id} em ${sala}`)
      if (pessoa_id !== "")
        this.leituras[pessoa_id] = true;
      return this.http.put(`${HOST}/sala/${sala}/pessoa?pessoa_id=${pessoa_id}`, {})
    } else {
      return of()
    }
  }

}
