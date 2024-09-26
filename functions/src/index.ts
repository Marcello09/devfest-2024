/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import {FieldValue, getFirestore, Timestamp} from "firebase-admin/firestore";
import * as admin from "firebase-admin";

import * as express from "express";
const app = express();

admin.initializeApp();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

const listSalas = (request: any, response: any) => {
  getFirestore().collection("salas")
    .get()
    .then(query => {
      return query.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
    })
    .then((res) => {
      response.send(res);
    }).catch((err) => {
      response.status(400).send(`Erro ao listar salas: ${err}`);
    });
};

const createSala = (request: any, response: any) => {
  const {nome, max_pessoas: maxPessoas} = request.query;
  getFirestore().collection("salas")
    .add({
      nome,
      max_pessoas: maxPessoas,
      pessoas: 0,
    }).then((res) => {
      response.send(`Sala criada com sucesso! ID: ${res.id}`);
    }).catch((err) => {
      response.status(400).send(`Erro ao criar sala: ${err}`);
    });
};


const deleteSala = (request: any, response: any) => {
  let {sala_id} = request.params;
  if (sala_id) {
    sala_id = sala_id.toString();
    getFirestore().collection("salas").doc(sala_id).delete()
      .then(() => {
        response.status(201).send("Sala deletada com sucesso!");
      }).catch((err) => {
        response.status(400).send(`Erro ao deletar sala: ${err}`);
      });
  } else {
    response.status(400).send("ID da sala não informado.");
  }
};

const inserePessoa = (request: any, response: any) => {
  let {sala_id} = request.params;
  let {pessoa_id} = request.query;
  if (sala_id && pessoa_id) {
    sala_id = sala_id.toString();
    pessoa_id = pessoa_id.toString();

    getFirestore().collection("salas").doc(sala_id).update({
      pessoas: FieldValue.increment(1),
    }).then(() => {
      getFirestore().collection("logs").add({
        sala_id: sala_id,
        pessoa_id,
        timestamp: Timestamp.now(),
      });
      response.send("Pessoa adicionada com sucesso!");
    }).catch((err) => {
      response.status(400).send(`Erro ao adicionar pessoa: ${err}`);
    });
  } else {
    response.status(400).send("ID da sala ou pessoa não informado.");
  }
};

const removePessoa = (request:any, response:any) => {
  let {sala_id} = request.params;
  if (sala_id) {
    sala_id = sala_id.toString();
    getFirestore().collection("salas").doc(sala_id).update({
      pessoas: FieldValue.increment(-1),
    }).then(() => {
      response.send("Pessoa removida com sucesso!");
    }).catch((err) => {
      response.status(400).send(`Erro ao remover pessoa: ${err}`);
    });
  } else {
    response.status(400).send("ID da sala ou pessoa não informado.");
  }
};

const esvaziaSala = (request:any, response:any) => {
  let {sala_id} = request.params;
  if (sala_id) {
    sala_id = sala_id.toString();
    getFirestore().collection("salas").doc(sala_id).update({
      pessoas: 0,
    }).then(() => {
      response.send("Sala esvaziada com sucesso!");
    }).catch((err) => {
      response.status(400).send(`Erro ao esvaziar sala: ${err}`);
    });
  } else {
    response.status(400).send("ID da sala não informado.");
  }
};


app.get("/sala", listSalas);
app.post("/sala", createSala);
app.delete("/sala/:sala_id", deleteSala);

app.put("/sala/:sala_id/pessoa", inserePessoa);
app.delete("/sala/:sala_id/pessoa", removePessoa);
app.delete("/sala/:sala_id/esvaziar", esvaziaSala);

export const api = onRequest(app);
