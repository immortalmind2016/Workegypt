import React, { Component } from "react";
import uuid from "uuid";
import DotsGroup from "../../../reusable/loaders/DotsGroup";
import isEmpty from "../../../../utils/isEmpty";
import { profile } from "../../../../utils/fixtures";
export default class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      chosenSkill: "",
      errors: {},
      isLoading: false
    };
    this.inputRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isLoading && this.props.profileEditing === false) {
      this.setState({ ...this.state, isLoading: false });
    }
  }

  controlLangInput = (shown = false) => {
    shown
      ? this.setState({ ...this.state, showInput: true, chosenSkill: "" })
      : this.setState({ ...this.state, showInput: false, chosenSkill: "" });
  };
  onChangeHandler = ({ target }) =>
    this.setState({ ...this.state, [target.name]: target.value });

  onBlurHandler = () => {
    const { chosenSkill } = this.state;
    if (!isEmpty(chosenSkill.trim())) {
      if (
        profile.skills.find(el => el === chosenSkill) &&
        !this.props.skills.find(skill => skill === chosenSkill)
      ) {
        const newSkills = [...this.props.skills, { name: chosenSkill }];
        this.props._editProfile({ skills: newSkills });
        this.setState({ ...this.state, isLoading: true });
        this.controlLangInput(false);
      }
    }
    this.controlLangInput(false);
  };

  keyDownHandler = ({ keyCode }) => {
    if (keyCode === 13) {
      this.onBlurHandler();

      this.controlLangInput(false);
    }
  };
  render() {
    const { skills, isPreviewing = false } = this.props;
    const { showInput, chosenSkill, isLoading } = this.state;

    const sk = skills?.map(skill => skill.name.toLowerCase());
    const filteredShownSkills = profile.skills.filter(
      skill => sk?.indexOf(skill.toLowerCase()) === -1
    );

    return (
      <div className="profile__skills main-card-layout relative-container">
        <h6 className="main-card-layout__title">Skills</h6>
        {!isPreviewing && (
          <button
            onClick={() => {
              this.controlLangInput(true);
              if (this.inputRef.current !== null) {
                this.inputRef.current.value = "";
                this.inputRef.current.focus();
              }
            }}
            className="btn--add-plus btn btn-primary rounded-circle"
            type="button"
            data-toggle="tooltip"
            data-placement="top"
            title="Add New Skill"
          >
            <i className="fas fa-plus text-light" />
          </button>
        )}

        <div className="d-flex flex-wrap relative-container">
          {isLoading ? (
            <DotsGroup />
          ) : skills?.length > 0 ? (
            skills?.map((skill, index) => (
              <div key={uuid()} className="skill-pill mb-2 relative-container">
                {skill && skill.name}
                {!isPreviewing && (
                  <i
                    className="fa fa-times pill-delete"
                    onClick={() => {
                      this.props._deleteProfileField("skills", index);
                    }}
                  />
                )}
              </div>
            ))
          ) : (
            "No skills added"
          )}
        </div>
        {showInput && !isPreviewing && (
          <>
            <input
              className="input--blank"
              type="text"
              list="skills"
              name="chosenSkill"
              value={chosenSkill}
              autoFocus
              ref={this.inputRef}
              onChange={this.onChangeHandler}
              onBlur={this.onBlurHandler}
              onKeyDown={this.keyDownHandler}
            />
            <datalist defaultValue={chosenSkill} id="skills">
              {filteredShownSkills.map(skill => (
                <option key={skill} value={skill} />
              ))}
            </datalist>
          </>
        )}
      </div>
    );
  }
}
