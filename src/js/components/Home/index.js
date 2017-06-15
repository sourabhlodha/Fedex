import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import BarchartImage from '../../../assets/images/barchart.jpg';
import topuploadspeeds from '../../../assets/images/topuploadspeeds.png';

import DropZonePage from './DropZonePage';
import VisionDetailPage from '../shared/VisionDetailPage';

import Guid from 'guid';

import { connect } from 'react-redux';
import { clearAll, saveToCosmosDB, getImageUrl, goToDropZonePage, uploadAzure, getVision, ocrVision, handWrittenVision, BingSearch, customVision } from '../../redux/actions';

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

    CustomVisionList: store.dropzone.CustomVisionList,
    CustomFetching: store.dropzone.CustomFetching,
    CustomFetched: store.dropzone.CustomFetched,
    CustomErr: store.dropzone.CustomErr,
    BingSearchList: store.dropzone.BingSearchList,
    BingSearchFetching: store.dropzone.BingSearchFetching,
    BingSearchFetched: store.dropzone.BingSearchFetched,
    BingErr: store.dropzone.BingErr,

  };
})


class Home extends Component {
  
  constructor() {
    super();
    this._onDrop = this._onDrop.bind(this);
    this._uploadToAWS = this._uploadToAWS.bind(this);
    this._callApi = this._callApi.bind(this);
    this._backToDropZone = this._backToDropZone.bind(this);
    this._callOcrApi = this._callOcrApi.bind(this);
    this._callHandWrittenApi = this._callHandWrittenApi.bind(this);
    this._onSave = this._onSave.bind(this);

    this._onCaptionChange = this._onCaptionChange.bind(this);
    this._onOcrChange = this._onOcrChange.bind(this);
    this._onHandWrittenChange = this._onHandWrittenChange.bind(this);
    this._onNotesChange = this._onNotesChange.bind(this);
    this._onTagsChange = this._onTagsChange.bind(this);
    this._onDescriptionTagsChange = this._onDescriptionTagsChange.bind(this);

    this._callBingSearchApi=this._callBingSearchApi.bind(this);
    this._callCustomVisionApi=this._callCustomVisionApi.bind(this);

    this.state = {
      files: [],
      index: 0,
      imagesArray: [],
      cosmosDB: '',
      guid: '',
      initialItems: '',
      tags: [],
      descriptiontags:[],
      captionvalue:'',
      ocrvalue:'',
      handwrittenvalues:'',
      notes:'',
      currurl:'',
      allcustom:'',
      disableCustomVisionButton: false,
    };
  }

  componentWillMount() {
    this.props.dispatch(clearAll());
    this.setState({ imagesArray: initialImages });
  }

  _onDrop(files) {
    this.setState({ files, index: 0 }, () => {
      this._uploadToAWS(files);
    });
  }

  _uploadToAWS(files) {
    if (this.state.index < this.state.files.length) {
      this.props.dispatch(uploadAzure(files[this.state.index]));
    }
  }

  _onTagsChange(tags) {
    this.setState({tags});
  }

  _onDescriptionTagsChange(descriptiontags){
    this.setState({descriptiontags});
  }

  _onCaptionChange(e){
    this.setState({captionvalue: e.target.value});
  }

  _onOcrChange(e){
    this.setState({ocrvalue:e.target.value});
  }
  _onHandWrittenChange(e){
    this.setState({handwrittenvalues:e.target.value});
  }
  _onNotesChange(e){
    this.setState({ notes: e.target.value });
  }

  _callApi(url) {  
    const imageBody = { url };

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

    if(nextProps.CustomFetched && !nextProps.CustomFetching) {
      const messages = JSON.parse(nextProps.CustomVisionList.Message);
      const allcustomvision = this.state.descriptiontags;
      _.map(messages.Predictions, items => {
        let confidence = items.Probability;
        confidence = confidence * 100;
        if(confidence > 50) {
          allcustomvision.push(items.Tag);
        }
      });

      this.setState({ descriptiontags: allcustomvision, disableCustomVisionButton: true });
      
    }

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

    if (  _.isEmpty(nextProps.CustomVisionList) && nextProps.visionFetched && nextProps.ocrFetched || _.isEmpty(nextProps.CustomVisionList) && nextProps.visionFetched && nextProps.handFetched ) {
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
        'confidence': Number(Number(nextProps.visionList.description.captions[0].confidence).toFixed(3)),
        'descriptiontags': nextProps.visionList.description.tags,
        'handwrittentags': handwrittentags,
        'id': this.state.guid,
        'ocrtags': orctags,
        'requestId': nextProps.visionList.requestId,
        '_rid': 'uuJBAOIBdAIBAAAAAAAAAA==',
        'tags': tags,
        'url': nextProps.imageUrl,
        'notes': '',
        'metadata': nextProps.visionList.metadata,
        '_self': 'dbs/uuJBAA==/colls/uuJBAOIBdAI=/docs/uuJBAOIBdAIBAAAAAAAAAA==/',
        '_etag': '"03000a12-0000-0000-0000-593cde6e0000"',
        '_attachments': 'attachments/',
        '_ts': 1497161326,
      };

      const allTags = [];
      const alldescriptiontags = [];
      let allcaption = '';

      _.map(tags, (item) => allTags.push(JSON.parse(item).name));
      _.map(nextProps.visionList.description.tags, (item) => alldescriptiontags.push(item));
      _.map(captions, (item) => {
        const data = JSON.parse(item);
        allcaption = data.text;
      });

      this.setState({ cosmosDB, tags: allTags,descriptiontags:alldescriptiontags,captionvalue:allcaption,ocrvalue:orctags,handwrittenvalues:handwrittentags});

    }

  }

  _onSave() {
    const data = this.state.cosmosDB;

    const alltags = [];
    const alldesc = [];
    let caps = '';

    _.map(this.state.tags, item => {
      alltags.push( item);
    });
    _.map(this.state.descriptiontags, item => {
      alldesc.push( item);
    });
    data.tags = alltags;
    data.descriptiontags=alldesc;
    
    caps = this.state.captionvalue;
   
    data.captions = caps;
    data.ocrtags = this.state.ocrvalue;
    data.handwrittentags = this.state.handwrittenvalues;
    data.notes = this.state.notes;
    console.log(data);
    this.props.dispatch(saveToCosmosDB(data));
  }

  _callBingSearchApi(query){
    let url = 'https://api.cognitive.microsoft.com/bing/v7.0/images/search?q='+query+'&modules=SimilarProducts&en-us&subscription-key=aa6e71cbaf9f49d2a12e7e03e09e698e';
    this.props.dispatch(BingSearch(url));
  } 

  _callCustomVisionApi(query){
    let url = 'http://fedexovergoodservices.azurewebsites.net/api/Prediction?imageURL='+query;
    this.props.dispatch(customVision(url));
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
    let visionFetchingProgress;
    if (visionFetching) {
      visionFetchingProgress = (<div className="vision-progress"><div className="status spinner">
                                  <div className="bounce1"></div>
                                  <div className="bounce2"></div>
                                  <div className="bounce3"></div>
                                </div></div>);
    }

    if (visionFetched && this.state.cosmosDB) {
      pageData = (
          <VisionDetailPage 
            visionFetching={visionFetching}
            cosmosDB={this.state.cosmosDB}
            onBack={this._backToDropZone}
            onSave={this._onSave}
            captionsValue={this.state.captionvalue}
            ocrValues={this.state.ocrvalue}
            handWritten={this.state.handwrittenvalues}
            notesValue={this.state.notes}
            tagsValue={this.state.tags}
            descriptionValue={this.state.descriptiontags}
            onCaptionChange={this._onCaptionChange}
            onOcrChange={this._onOcrChange}
            onHandWrittenChange={this._onHandWrittenChange}
            onNotesChange={this._onNotesChange}
            onTagsChange={this._onTagsChange}
            onDescriptionTagsChange={this._onDescriptionTagsChange}
            disableCustomVisionButton={this.state.disableCustomVisionButton}
            onBingSearch={this._callBingSearchApi}
            onCustomVisionSearch={this._callCustomVisionApi}
          />
      );
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
        {visionFetchingProgress}
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

Home.propTypes = {
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
  CustomVisionList:PropTypes.array,
  CustomFetching:PropTypes.bool,
  CustomFetched:PropTypes.bool,
  BingSearchList:PropTypes.array,
  BingSearchFetching:PropTypes.bool,
  BingSearchFetched:PropTypes.bool,
};

export default Home;
