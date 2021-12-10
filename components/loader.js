import Loader from "react-loader-spinner";
export default class LoaderComponent extends React.Component {
  //other logic
  render(props) {
    return (
        <Loader type="Circles" color="#00BFFF" height={80} width={80}/>
    );
  }
}