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

const listSalas = (request: express.Request, response: express.Response) => {
  getFirestore("devfest").collection("salas")
    .get()
    .then((query) => {
      return query.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
    })
    .then((res) => {
      response.send(res);
    }).catch((err) => {
      response.status(400).send({error: `Erro ao listar salas: ${err}`});
    });
};

const createSala = (request: express.Request, response: express.Response) => {
  const {nome, max_pessoas: maxPessoas} = request.body;
  getFirestore("devfest").collection("salas")
    .add({
      nome,
      max_pessoas: maxPessoas,
      pessoas: 0,
    }).then((res) => {
      response.send({
        id: res.id,
        message: `Sala criada com sucesso! ID: ${res.id}`,
      });
    }).catch((err) => {
      response.status(400).send({error: `Erro ao criar sala: ${err}`});
    });
};


const deleteSala = (request: express.Request, response: express.Response) => {
  let salaId = request.params.sala_id;
  if (salaId) {
    salaId = salaId.toString();
    getFirestore("devfest").collection("salas").doc(salaId).delete()
      .then(() => {
        response.status(201).send({message: "Sala deletada com sucesso!"});
      }).catch((err) => {
        response.status(400).send({error: `Erro ao deletar sala: ${err}`});
      });
  } else {
    response.status(400).send({error: "ID da sala não informado."});
  }
};

const inserePessoa = (request: express.Request, response: express.Response) => {
  let {sala_id: salaId} = request.params;
  let {pessoa_id: pessoaId} = request.query;
  if (salaId && pessoaId) {
    salaId = salaId.toString();
    pessoaId = pessoaId.toString();

    getFirestore("devfest").collection("salas").doc(salaId).update({
      pessoas: FieldValue.increment(1),
    }).then(() => {
      getFirestore("devfest").collection("logs").add({
        sala_id: salaId,
        pessoa_id: pessoaId,
        timestamp: Timestamp.now(),
      });
      response.send({message: "Pessoa adicionada com sucesso!"});
    }).catch((err) => {
      response.status(400).send({error: `Erro ao adicionar pessoa: ${err}`});
    });
  } else {
    response.status(400).send({error: "ID da sala ou pessoa não informado."});
  }
};

const removePessoa = (request: express.Request, response: express.Response) => {
  let {sala_id: salaId} = request.params;
  if (salaId) {
    salaId = salaId.toString();
    getFirestore("devfest").collection("salas").doc(salaId).update({
      pessoas: FieldValue.increment(-1),
    }).then(() => {
      response.send({message: "Pessoa removida com sucesso!"});
    }).catch((err) => {
      response.status(400).send({error: `Erro ao remover pessoa: ${err}`});
    });
  } else {
    response.status(400).send({error: "ID da sala ou pessoa não informado."});
  }
};

const esvaziaSala = (request: express.Request, response: express.Response) => {
  let {sala_id: salaId} = request.params;
  if (salaId) {
    salaId = salaId.toString();
    getFirestore("devfest").collection("salas").doc(salaId).update({
      pessoas: 0,
    }).then(() => {
      response.send({message: "Sala esvaziada com sucesso!"});
    }).catch((err) => {
      response.status(400).send({error: `Erro ao esvaziar sala: ${err}`});
    });
  } else {
    response.status(400).send({error: "ID da sala não informado."});
  }
};

// eslint-disable-next-line new-cap
const router = express.Router();

router.get("/sala", listSalas);
router.post("/sala", createSala);
router.delete("/sala/:sala_id", deleteSala);

router.put("/sala/:sala_id/pessoa", inserePessoa);
router.delete("/sala/:sala_id/pessoa", removePessoa);
router.delete("/sala/:sala_id/esvaziar", esvaziaSala);

app.use("/api", router);

export const api = onRequest({
  cors: [/web\.app$/],
}, app);
