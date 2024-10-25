/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import {getFirestore, Timestamp} from "firebase-admin/firestore";
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

const inserePessoa = async (
  request: express.Request, response: express.Response) => {
  let {sala_id: salaId} = request.params;
  let {pessoa_id: pessoaId} = request.query;
  if (!pessoaId) {
    pessoaId = "Sem QR Code";
  }
  if (salaId && pessoaId) {
    salaId = salaId.toString();
    pessoaId = pessoaId.toString();
    const docRef = getFirestore("devfest").collection("salas").doc(salaId);
    try {
      getFirestore("devfest").runTransaction(async (transaction) => {
        const doc = await transaction.get(docRef);
        const newPessoas = doc.data()?.pessoas + 1;
        if (newPessoas > doc.data()?.max_pessoas) {
          throw new Error("Sala cheia!");
        }
        await transaction.update(docRef, {pessoas: newPessoas});
        getFirestore("devfest").collection("logs").add({
          sala_id: salaId,
          pessoa_id: pessoaId,
          timestamp: Timestamp.now(),
        });
        response.send({message: "Pessoa adicionada com sucesso!"});
      });
    } catch (err) {
      response.status(400).send({error: "Sala Cheia!"});
    }
  } else {
    response.status(400).send({error: "ID da sala não informado."});
  }
};

const removePessoa = (request: express.Request, response: express.Response) => {
  let {sala_id: salaId} = request.params;
  const {quantidade} = request.query;
  if (salaId) {
    salaId = salaId.toString();
    const removeQuantity = quantidade ? parseInt(quantidade.toString(), 10) : 1;
    try {
      getFirestore("devfest").runTransaction(async (transaction) => {
        const docRef = getFirestore("devfest").collection("salas").doc(salaId);
        const doc = await transaction.get(docRef);
        let newPessoas = doc.data()?.pessoas - removeQuantity;
        if (newPessoas < 0) {
          newPessoas = 0;
        }
        await transaction.update(docRef, {pessoas: newPessoas});
        response.send({message: "Pessoa removida com sucesso!"});
      });
    } catch (err) {
      response.status(500).send({error: `Erro ao remover pessoa: ${err}`});
    }
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
