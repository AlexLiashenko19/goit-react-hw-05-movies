import { ProgressBar } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div>
      <ProgressBar
        height="180"
        width="180"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor="#f6fa1e"
        barColor="#3a28fc"
      />
    </div>
  );
};
