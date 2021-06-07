import './Result.css';

interface Props {
  result: any;
}
const Result = ({ result }: Props) => {
  const resultsJson = result ? JSON.stringify(result, null, 2) : '';
  return (
    <div className="result-pane">
      <textarea value={resultsJson} readOnly={true} />
    </div>
  );
};

export default Result;
