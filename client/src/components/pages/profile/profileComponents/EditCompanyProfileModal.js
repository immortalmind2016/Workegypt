import React, { useState, useEffect } from "react";

const EditCompanyProfileModal = ({
  name = "",
  about = "",
  facebook = "",
  twitter = "",
  instagram = "",
  linkedIn = "",
  editProfile = () => {},
  editUserData = () => {},
  handleModalClose = () => {}
}) => {
  const [companyProfile, setCompanyProfile] = useState({
    about: about || "",
    name: name || "",
    facebook: facebook || "",
    linkedIn: linkedIn || "",
    instagram: instagram || "",
    twitter: twitter || ""
  });
  useEffect(() => {
    setCompanyProfile({
      about,
      name,
      facebook,
      linkedIn,
      instagram,
      twitter
    });
  }, [about, name, facebook, linkedIn, instagram, twitter]);
  const onChangeHandler = e => {
    const { name, value } = e.target;
    setCompanyProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSave = () => {
    const {
      about,
      name,
      facebook,
      twitter,
      instagram,
      linkedIn
    } = companyProfile;

    //call database and then hide modal
    const profileData = {
      company_about: about,
      social_links: {
        facebook,
        twitter,
        instagram,
        linkedIn
      }
    };
    const userData = {
      new: false,
      name
    };
    editProfile(profileData, true);
    editUserData(userData);
  };

  return (
    <div
      className="modal fade"
      id="CompanyProfileModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="CompanyProfileModalTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="CompanyProfileModalTitle">
              Edit Profile
            </h5>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              {/*     {error && (
                  <p className="text-center text-danger">
                    missing required data denoted with ' * '
                  </p>
                )} */}
              <form>
                <div className="row mb-3">
                  <div className="col">
                    <input
                      onChange={onChangeHandler}
                      type="text"
                      className="form-control"
                      placeholder="Name*"
                      name="name"
                      value={companyProfile.name}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <input
                      onChange={onChangeHandler}
                      type="text"
                      className="form-control"
                      placeholder="About*"
                      name="about"
                      value={companyProfile.about}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col font-weight-bold">Social Links</div>
                </div>
                <div className="row mb-2">
                  <div className="col">
                    <input
                      onChange={onChangeHandler}
                      type="text"
                      className="form-control"
                      placeholder="facebook"
                      name="facebook"
                      value={companyProfile.facebook}
                    />
                  </div>
                  <div className="col">
                    <input
                      onChange={onChangeHandler}
                      type="text"
                      className="form-control"
                      placeholder="instagram"
                      name="instagram"
                      value={companyProfile.instagram}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <input
                      onChange={onChangeHandler}
                      type="text"
                      className="form-control"
                      placeholder="twitter"
                      name="twitter"
                      value={companyProfile.twitter}
                    />
                  </div>
                  <div className="col">
                    <input
                      onChange={onChangeHandler}
                      type="text"
                      className="form-control"
                      placeholder="linkedIn"
                      name="linkedIn"
                      value={companyProfile.linkedIn}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={handleModalClose}
            >
              Close
            </button>
            <button onClick={onSave} type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditCompanyProfileModal;
