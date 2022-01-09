import { useState, useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core/";

const Contatos = () => {
  const url = "http://localhost:5000/message";
  const [message, setMessage] = useState([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [validator, setValidator] = useState(false);
  const [render, setRender] = useState(false);
  const [success, setSuccess] = useState(false);
  const [id, setId] = useState("");

  useEffect(async () => {
    const response = await fetch(url);
    const data = await response.json();
    setMessage(data);
  }, [render]);

  const sendMessagePost = () => {
    setValidator(false);
    if (author.length <= 0 || content.length <= 0) {
      return setValidator(!validator);
    }
    const bodyForm = {
      email: author,
      message: content,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyForm),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          setRender(data);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 2000);
        }
      });
    setId("");
    setAuthor("");
    setContent("");
  };

  const sendMessagePut = () => {
    setValidator(false);
    if (author.length <= 0 || content.length <= 0) {
      return setValidator(!validator);
    }
    const bodyForm = {
      id: id,
      email: author,
      message: content,
    };

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyForm),
    })
      .then((response) => response.json())
      .then((data) => {
        setRender(data);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      });

    setId("");
    setAuthor("");
    setContent("");
  };

  return (
    <>
      <Grid container direction="row" xs={12}>
        <TextField
          id="name"
          label="Name"
          value={author}
          onChange={(event) => {
            setAuthor(event.target.value);
          }}
          fullWidth
        />
        <TextField
          id="message"
          label="Message"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
          fullWidth
        />
      </Grid>

      {validator && (
        <div
          className="alert alert-warning alert-dismissible fade show mt-2"
          role="alert"
        >
          <strong>Por favor preencha todos os campos!</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      {success && (
        <div
          className="alert alert-success alert-dismissible fade show mt-2"
          role="alert"
        >
          <strong>Operação realizada com sucesso!</strong>
        </div>
      )}

      <Button
        onClick={id == "" ? sendMessagePost : sendMessagePut}
        className="mt-2"
        variant="contained"
        color="primary"
      >
        {id == "" ? "Salvar" : "Atualizar"}
      </Button>

      {message.map((content) => {
        return (
          <div className="card mt-2" key={content.id}>
            <div className="card-body">
              <h5 className="card-title">{content.email}</h5>
              <p className="card-text">{content.message}</p>
              <p className="card-text">
                <small className="text-muted">{content.created_at}</small>
              </p>
              <Button
                onClick={() => {
                  fetch(`${url}/${content.id}`, {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      setRender(data);
                      setSuccess(true);
                      setTimeout(() => {
                        setSuccess(false);
                      }, 2000);
                    });
                }}
                className="m-1"
                variant="contained"
              >
                Excluir
              </Button>

              <Button
                className="m-1"
                variant="contained"
                onClick={() => {
                  setId(content.id);
                  setAuthor(content.email);
                  setContent(content.message);
                }}
              >
                Editar
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Contatos;
