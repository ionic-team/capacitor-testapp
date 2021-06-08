import './Result.css';

function cloneAsObject(obj: any) {
  if (obj === null || !(obj instanceof Object)) {
    return obj;
  }
  var temp = obj instanceof Array ? ([] as any[]) : ({} as any);
  // ReSharper disable once MissingHasOwnPropertyInForeach
  for (var key in obj) {
    temp[key] = cloneAsObject(obj[key]);
  }
  return temp;
}

interface Props {
  result: any;
}
const Result = ({ result }: Props) => {
  console.log('Stringify', result);
  const resultsJson = result
    ? JSON.stringify(cloneAsObject(result), null, 2)
    : '';
  console.log(resultsJson);
  return (
    <div className="result-pane">
      <textarea value={resultsJson} readOnly={true} />
    </div>
  );
};

export default Result;
