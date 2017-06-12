import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import BarchartImage from '../../../assets/images/barchart.jpg';
import topuploadspeeds from '../../../assets/images/topuploadspeeds.png';

import DropZonePage from './DropZonePage';
import VisionDetailPage from '../shared/VisionDetailPage';

import Guid from 'guid';

import { connect } from 'react-redux';
import { clearAll, saveToCosmosDB, getImageUrl, goToDropZonePage, uploadAzure, getVision, ocrVision, handWrittenVision } from '../../redux/actions';

@connect((store) => {
  return {
    dropzoneImgUrl: store.dropzone.dropzoneImgUrl,
    fetching: store.dropzone.fetching,
    fetched: store.dropzone.fetched,
    err: store.dropzone.err,
    
    visionList: store.dropzone.visionList,
    visionFetching: store.dropzone.visionFetching,
    visionFetched: store.dropzone.visionFetched,
    visionErr: store.dropzone.visionErr,

    ocrList: store.dropzone.ocrList,
    ocrFetching: store.dropzone.ocrFetching,
    ocrFetched: store.dropzone.ocrFetched,
    ocrErr: store.dropzone.ocrErr,

    handList: store.dropzone.handList,
    handFetching: store.dropzone.handFetching,
    handFetched: store.dropzone.handFetched,
    handErr: store.dropzone.handErr,

    imageUrl: store.dropzone.imageUrl,

  };
})


class LandingPage extends Component {
  
  constructor() {
    super();
    this._onDrop = this._onDrop.bind(this);
    this._uploadToAWS = this._uploadToAWS.bind(this);
    this._callApi = this._callApi.bind(this);
    this._backToDropZone = this._backToDropZone.bind(this);
    this._callOcrApi = this._callOcrApi.bind(this);
    this._callHandWrittenApi = this._callHandWrittenApi.bind(this);
    this._onSave = this._onSave.bind(this);

    this.state = {
      files: [],
      index: 0,
      imagesArray: [],
      cosmosDB: '',
      guid: '',
      initialItems: '',
    };
  }

  componentWillMount() {
    this.props.dispatch(clearAll());
    this.setState({ imagesArray: initialImages });
  }

  _onDrop(files, rejectedFiles) {
    console.log(files, rejectedFiles);
    this.setState({ files, index: 0 }, () => {
      this._uploadToAWS(files);
    });
  }

  _uploadToAWS(files) {
    if (this.state.index < this.state.files.length) {
      this.props.dispatch(uploadAzure(files[this.state.index]));
    }
  }

  _callApi(url) {  
    const imageBody = { url };
    console.log(imageBody);
    this.props.dispatch(getVision(imageBody));
    
    this.props.dispatch(getImageUrl(url));

    this._callOcrApi(imageBody);
    this._callHandWrittenApi(imageBody);
    this.setState({ guid: Guid.raw() });
  }

  _callOcrApi(imageBody) {  
    this.props.dispatch(ocrVision(imageBody));
  }

  _callHandWrittenApi(imageBody) {  
    this.props.dispatch(handWrittenVision(imageBody));
  }

  _backToDropZone() {
    this.props.dispatch(goToDropZonePage());
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.fetched && !nextProps.fetching) {
      let obj = {
        imgurl: nextProps.dropzoneImgUrl,
        name: this.state.files[this.state.index].name,
      };
      const itemIndex = this.state.imagesArray.length + this.state.index;
      const images = _.extend([], this.state.imagesArray);
      images[itemIndex] = obj;
      this.setState({ imagesArray: images, index: this.state.index + 1 }, () => {
        this._uploadToAWS(this.state.files);
      });
    }

    if (nextProps.visionFetched && nextProps.ocrFetched || nextProps.visionFetched && nextProps.handFetched ) {
      const allOrcText = [];
      const allHandText = [];

      if(!_.isEmpty(nextProps.ocrList.regions)) {
        _.map(nextProps.ocrList.regions, region => {
          _.map(region.lines, line => {
            _.map(line.words, word => {
              allOrcText.push(word.text);
            });
          });
        });
      }

      if(!_.isEmpty(nextProps.handList)) {
        if (!_.isEmpty(nextProps.handList.recognitionResult)) {
          _.map(nextProps.handList.recognitionResult.lines, line => {
            allHandText.push(line.text);
          });
        }
      }

      const orctags = _.join(allOrcText, ' ');
      const handwrittentags = _.join(allHandText, ' ');
      
      const tags = [];

      const captions = [];

      if (!_.isEmpty(nextProps.visionList.description.captions)) {
        _.map(nextProps.visionList.description.captions, item => captions.push(JSON.stringify(item)));
      }

      if (!_.isEmpty(nextProps.visionList.tags)) {
        _.map(nextProps.visionList.tags, item => tags.push(JSON.stringify(item)));
      }

      const cosmosDB = {
        'captions': captions,
        'confidence': nextProps.visionList.description.captions[0].confidence,
        'descriptiontags': nextProps.visionList.description.tags,
        'handwrittentags': handwrittentags,
        'id': this.state.guid,
        'ocrtags': orctags,
        'requestId': nextProps.visionList.requestId,
        '_rid': 'uuJBAOIBdAIBAAAAAAAAAA==',
        'tags': tags,
        'url': nextProps.imageUrl,
        'metadata': nextProps.visionList.metadata,
        '_self': 'dbs/uuJBAA==/colls/uuJBAOIBdAI=/docs/uuJBAOIBdAIBAAAAAAAAAA==/',
        '_etag': '"03000a12-0000-0000-0000-593cde6e0000"',
        '_attachments': 'attachments/',
        '_ts': 1497161326,
      };

      this.setState({ cosmosDB });

    }

  }

  _onSave() {
    this.props.dispatch(saveToCosmosDB(this.state.cosmosDB));
  }

  render() {

    const { fetching, visionFetching, visionFetched } = this.props;
  
    let images;

    if (!_.isEmpty(this.state.imagesArray)) {
      images = _.map(_.reverse(this.state.imagesArray), (f, i) => {
        const status = <div className="status"><button className="btn btn-primary" type="button" onClick={() => this._callApi(f.imgurl)}>View</button></div>;
        const style = { 'backgroundImage': `url(${f.imgurl})`};

        return (<li key={i} className="dropzoneItems"> <div className="thumb"><div className="image-thumb" style={style}></div></div> <div className="file-name">{f.name}</div> {status}</li>);
      });
    }
    
    let pageData;

    if (visionFetched && this.state.cosmosDB) {
      pageData = <VisionDetailPage visionFetching={visionFetching} cosmosDB={this.state.cosmosDB} onBack={this._backToDropZone} onSave={this._onSave}/>;
    }

    return (
      <div className="container-fluid landingPage">
        <div className="row">
          <div className="col-sm-7">
            <div className="card top-card">
              <h4>Report</h4>
              <div className="card-body">
              <div className="total">
                Total uploads: <span>23023</span>
              </div>
              <div className="graph">
                <img src={BarchartImage} width="250" />
              </div>
              <div className="info">
                <ul>
                  <li> <span className="green-dot"></span> Visitors </li>
                  <li> <span className="green-dot"></span> Visitors </li>
                </ul>
              </div>
              <div className="uploads">
                <ul>
                  <li> 12314123</li>
                  <li> 23434 </li>
                </ul>
              </div>
              </div>
            </div>
          </div>
          <div className="col-sm-5">
            <div className="card top-card">
              <img src={topuploadspeeds} />
            </div>
          </div>
        </div>
        <DropZonePage fetching={fetching} images={images} onDrop={this._onDrop}/>
        {pageData}
      </div>
    );
  }
}

const initialImages = [
  {
    imgurl: 'https://asgtagur.blob.core.windows.net/aap-uploads/20160718G0001_1.jpg',
    name: 'image name1',
  },
  {
    imgurl: 'https://asgtagur.blob.core.windows.net/aap-uploads/20160718G0005_1.jpg',
    name: 'image name2',
  },
  {
    imgurl: 'https://asgtagur.blob.core.windows.net/aap-uploads/20160718G0016_2.jpg',
    name: 'image name3',
  },
  {
    imgurl: 'https://asgtagur.blob.core.windows.net/aap-uploads/20160718G0005_1.jpg',
    name: 'image name4',
  },
];

LandingPage.propTypes = {
  dispatch: PropTypes.func,
  dropzoneImgUrl: PropTypes.string,
  fetching: PropTypes.bool,
  fetched: PropTypes.bool,
  err: PropTypes.string,
  visionFetched: PropTypes.bool,
  visionList: PropTypes.array,
  visionFetching: PropTypes.bool,
  handList: PropTypes.array,
  ocrList: PropTypes.array,
  ocrFetched: PropTypes.bool,
  ocrFetching: PropTypes.bool,
  handFetched: PropTypes.bool,
  handFetching: PropTypes.bool,
  imageUrl: PropTypes.string,
};

export default LandingPage;
