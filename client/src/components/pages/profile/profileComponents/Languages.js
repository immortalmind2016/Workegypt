import React, { Component } from "react";
import uuid from "uuid";
import { profile } from "../../../../utils/fixtures";
import isEmpty from "../../../../utils/isEmpty";
import BarLoader from "../../../reusable/loaders/BarLoader";
export default class Languages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLanguageInput: false,
      chosenLang: "",
      errors: {},
      loading: false
    };
    this.inputRef = React.createRef();
  }

  controlLangInput = (shown = false) => {
    shown
      ? this.setState({
          ...this.state,
          showLanguageInput: true,
          chosenLang: ""
        })
      : this.setState({
          ...this.state,
          showLanguageInput: false,
          chosenLang: ""
        });
  };
  onChangeHandler = ({ target }) =>
    this.setState({ ...this.state, [target.name]: target.value });

  onBlurHandler = () => {
    const { chosenLang } = this.state;
    if (!isEmpty(chosenLang.trim())) {
      if (
        profile.languages.find(el => el === chosenLang) &&
        !this.props.languages.find(lang => lang.title === chosenLang)
      ) {
        this.props._editProfile({
          languages: [...this.props.languages, { title: chosenLang, Score: 0 }]
        });
        this.setState({ ...this.state, chosenLang: "" }, () => {
          this.controlLangInput(false);
        });
      }
    }
    this.controlLangInput(false);
  };
  keyDownHandler = ({ keyCode }) => {
    if (keyCode === 13) {
      this.onBlurHandler();
      this.setState({ ...this.state, chosenLang: "" }, () => {
        this.controlLangInput(false);
      });
    }
  };
  render() {
    const { languages, isPreviewing = false } = this.props;
    const { showLanguageInput, chosenLang, errors } = this.state;
    const lng = languages?.map(lang => lang.title.toLowerCase());
    const filteredShownLanguages = profile.languages.filter(
      lang => lng?.indexOf(lang.toLowerCase()) === -1
    );

    return (
      <div className="profile__languages main-card-layout relative-container">
        <h6 className="main-card-layout__title">Languages</h6>
        {!isPreviewing && (
          <button
            onClick={() => {
              this.controlLangInput(true);
              if (this.inputRef.current !== null) {
                this.inputRef.current.value = "";
                this.inputRef.current.focus();
              }
            }}
            type="button"
            data-toggle="tooltip"
            data-placement="top"
            title="Add New Language"
            className="btn--add-plus btn btn-primary rounded-circle"
          >
            <i className="fas fa-plus text-light" />
          </button>
        )}
        <div className="d-flex relative-container flex-wrap">
          {languages === null ? (
            <BarLoader width={"20%"} />
          ) : languages.length > 0 ? (
            languages.map((lang, index) => (
              <div key={uuid()} className="lang-pill mb-2 relative-container ">
                {lang.title}
                {!isPreviewing && (
                  <i
                    className="fas fa-times pill-delete"
                    onClick={() => {
                      this.props._deleteProfileField("languages", index);
                    }}
                  />
                )}
              </div>
            ))
          ) : (
            Object.keys(errors).length === 0 &&
            !showLanguageInput &&
            "No languages added"
          )}

          {errors.langNotFound && (
            <p className="text-danger">{errors.langNotFound}</p>
          )}
          {showLanguageInput && !isPreviewing && (
            <>
              <select
                className="input--blank d-block"
                style={{ width: 140 }}
                type="text"
                list="langs"
                name="chosenLang"
                value={chosenLang}
                autoFocus
                ref={this.inputRef}
                onChange={this.onChangeHandler}
                onBlur={this.onBlurHandler}
                onKeyDown={this.keyDownHandler}
                autoSave={false}
                autoComplete={"false"}
              >
                <option className="disabled text-muted" value="">
                  Select Language
                </option>
                {filteredShownLanguages.map(lang => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      </div>
    );
  }
}
