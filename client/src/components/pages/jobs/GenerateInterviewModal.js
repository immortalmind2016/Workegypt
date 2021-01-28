import React, { useRef, useState } from "react";
import { generateCode } from "../../../services/interviews";
import moment from "moment";
const GenerateInterviewModal = ({ companyId, email }) => {
  const textareaRef = useRef();
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(null);
  const [codeExpiryDate, setCodeExpiryDate] = useState(null);
  const [copied, setCopied] = useState(false);
  const wait = () => new Promise((resolve) => setTimeout(resolve, 700));
  const _handleCodeGeneration = async () => {
    setLoading(true);
    try {
      const { data } = await generateCode();
      const { code, endDate } = data.code;
      setLoading(false);
      setCodeExpiryDate(endDate);

      textareaRef.current.value = code;
      setGenerated(true);
    } catch (error) {
      setLoading(undefined);
    }
  };

  const _copyToClipboard = () => {
    textareaRef.current.select();
    document.execCommand("copy");
    setCopied(true);
    wait().then(() => setCopied(false));
  };

  return (
    <div className="generate-interview-modal">
      <h3 className="title">generate sharable interview code</h3>
      <p className="text-muted mt-3 mb-5">
        this code can be shared with people you want to invite to an interview.
      </p>

      <div className="flex-centered content">
        <textarea ref={textareaRef} className="code-textarea mb-2" />
        {codeExpiryDate && (
          <small className="font-weight-bold">
            this code expires at{" "}
            {moment(codeExpiryDate).format("DD-MM-YYYY hh:mm a")}
          </small>
        )}
        <div className="mt-2">
          {generated ? (
            <button
              style={{ minWidth: 150 }}
              className="btn-dark btn"
              onClick={_copyToClipboard}
            >
              {copied ? "Copied" : "Copy to clipboard"}
            </button>
          ) : (
            <button
              style={{ minWidth: 150 }}
              className="btn-primary btn"
              onClick={_handleCodeGeneration}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border" role="status" />
              ) : (
                "Generate"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateInterviewModal;
