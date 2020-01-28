import React from "react";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

const Appointment = props => {
  const CREATE = "CREATE";
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition("SAVING");

    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition("SHOW", false);
      })
      .catch(error => transition(ERROR_SAVE, true));
  };

  const onEdit = () => {
    transition("EDIT");
  };

  const onCancel = () => {
    back();
  };

  const onDelete = () => {
    transition("CONFIRM");
  };

  const onConfirmedDelete = () => {
    transition("DELETING");

    props
      .cancelInterview(props.id)
      .then(() => {
        transition("EMPTY");
      })
      .catch(error => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition("CREATE", false)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Yo, you sure you want to delete this?"}
          onConfirm={onConfirmedDelete}
          onCancel={onCancel}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Delete action failed. Sorry G." onClose={back} />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Save action failed. Sorry friend" onClose={back} />
      )}
    </article>
  );
};

export default Appointment;
