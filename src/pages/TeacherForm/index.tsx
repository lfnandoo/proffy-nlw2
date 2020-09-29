import React, { FormEvent } from "react";
import "./styles.css";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";

import warningIcon from "../../assets/images/icons/warning.svg";
import api from "../../services/api";

export default function TeacherForm() {
  const [name, setName] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [whatsapp, setWhatsapp] = React.useState("");
  const [bio, setBio] = React.useState("");

  const [subject, setSubject] = React.useState("");
  const [cost, setCost] = React.useState("");

  const [scheduleItems, setScheduleItems] = React.useState([
    { week_day: 0, from: "", to: "" },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: "", to: "" }]);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api
      .post("classes", {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      })
      .then(() => {
        alert("Cadastro finalizado com sucesso!");
      })
      .catch(() => {
        alert("Erro no cadastro!");
      });
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string
  ) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={({ target }) => setAvatar(target.value)}
            />
            <Input
              name="whatsapp"
              label="WhatsApp"
              value={whatsapp}
              onChange={({ target }) => setWhatsapp(target.value)}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={({ target }) => setBio(target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={({ target }) => setSubject(target.value)}
              options={[
                {
                  value: "Artes",
                  label: "Artes",
                },
                {
                  value: "Biologia",
                  label: "Biologia",
                },
                {
                  value: "Educação Física",
                  label: "Educação Física",
                },
                {
                  value: "Ciências",
                  label: "Ciências",
                },
                {
                  value: "Física",
                  label: "Física",
                },
                {
                  value: "Geografia",
                  label: "Geografia",
                },
                {
                  value: "História",
                  label: "História",
                },
                {
                  value: "Matemática",
                  label: "Matemática",
                },
                {
                  value: "Química",
                  label: "Química",
                },
                {
                  value: "Português",
                  label: "Português",
                },
              ]}
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={({ target }) => setCost(target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia de semana"
                    value={scheduleItem.week_day}
                    onChange={(e) =>
                      setScheduleItemValue(index, "week_day", e.target.value)
                    }
                    options={[
                      {
                        value: "0",
                        label: "Domingo",
                      },
                      {
                        value: "1",
                        label: "Segunda-feira",
                      },
                      {
                        value: "2",
                        label: "Terça-feira",
                      },
                      {
                        value: "3",
                        label: "Quarta-feira",
                      },
                      {
                        value: "4",
                        label: "Quinta-feira",
                      },
                      {
                        value: "5",
                        label: "Sexta-feira",
                      },
                      {
                        value: "6",
                        label: "Sábado",
                      },
                    ]}
                  />
                  <Input
                    name="from"
                    label="Das"
                    type="time"
                    value={scheduleItem.from}
                    onChange={(e) =>
                      setScheduleItemValue(index, "from", e.target.value)
                    }
                  />
                  <Input
                    name="to"
                    label="Até"
                    type="time"
                    value={scheduleItem.to}
                    onChange={(e) =>
                      setScheduleItemValue(index, "to", e.target.value)
                    }
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}
