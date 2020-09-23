import React from "react";
import "./styles.css";

import PageHeader from "../../components/PageHeader";

import TeacherItem from "../../components/TeacherItem";
import Input from "../../components/Input";

export default function TeacherList() {
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers">
          <Input name="subject" label="Materia" />
          <Input name="week_day" label="Dia de semana" />
          <Input type="time" name="time" label="hour" />
        </form>
      </PageHeader>

      <main>
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
      </main>
    </div>
  );
}
