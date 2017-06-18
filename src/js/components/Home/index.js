import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import VisionDetailPage from '../shared/VisionDetailPage';
import HomePage from './HomePage';
import BingSearchPage from '../BingSearch';

import { Redirect } from 'react-router-dom';

import Guid from 'guid';

import { connect } from 'react-redux';
import { clearAll, saveToCosmosDB, getImageUrl, goToDropZonePage, uploadAzure, getVision, ocrVision, handWrittenVision, BingSearch, customVision, stopbot } from '../../redux/actions';

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

    LuisList:store.luissearch.LuisList,
    Luisfetching:store.luissearch.LuisList,
    Luisfetched:store.luissearch.LuisList,

    intent: store.audio.intent,

    Modal:store.dropzone.Modal,
    BingPage:store.dropzone.BingPage,
    DropPage:store.dropzone.DropPage,

  };
})


class Home extends Component {
  
  constructor(props) {
    super(props);
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

    this._callBingSearchApi = this._callBingSearchApi.bind(this);
    this._callCustomVisionApi = this._callCustomVisionApi.bind(this);
    this._callApiFromBing=this._callApiFromBing.bind(this);
    this._onPreviousUrl=this._onPreviousUrl.bind(this);
    this._previosHandwrittenTags=this._previosHandwrittenTags.bind(this);
    this._previosOcrTags=this._previosOcrTags.bind(this);
    this._backtoHome=this._backtoHome.bind(this);
    this._onDropBing=this._onDropBing.bind(this);
    this._onTextBingSearch=this._onTextBingSearch.bind(this);
    this._onBingSearchTextChange=this._onBingSearchTextChange.bind(this);
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
      gotoSearchPage: false,
      Modal:false,
      Drop:false,
      BingSearch:false,
      arrayImage:'',
      previosurl:'',
      previosHandwrittenTags:'',
      previosOcrTags:'',
      customconfidence:0,
      bingImageSearch:false,
      searchValue:'',
      
      

    };
  }


  componentWillMount() {
    // localStorage.clear();
    this._backtoHome();
    this.setState({ imagesArray: initialImages, gotoSearchPage: false });
  }

  _onBingSearchTextChange(e) {
    this.setState({ searchValue: e.target.value });
    console.log(this.state.searchvalue);
  }



 

  _onCustomConfidence(CustomVisionConfidence){
    this.setState({ customconfidence:CustomVisionConfidence});
  }
  _backtoHome() {
    this.setState({ gotoNextPage: false }, () => {
      this.props.dispatch(clearAll());
    });
  }

  _onTextBingSearch(){
    console.log(value);
    // this._callBingTextApi(text);
  }
  _onDropBing(files) {
    this.setState({bingImageSearch:true});
    this.setState({ files, index: 0 }, () => {
      this._uploadToAWS(files);
    });
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
  
  _onPreviousUrl(e){
    this.setState({ previosurl: e });
  }

  _previosHandwrittenTags(e){
    this.setState({ previosHandwrittenTags: e });

  }

  _previosOcrTags(e){
    this.setState({previosOcrTags:e});
  }


  _callApiFromBing(cosmos,url){
   
    this._onPreviousUrl(cosmos.url);
    this._previosHandwrittenTags(cosmos.handwrittentags);
    this._previosOcrTags(cosmos.ocrtags);
    this.setState({gotoNextPage:true});
    this._callApi(url);
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
    if(this.state.bingImageSearch){
      if (nextProps.dropzoneImgUrl) {
        this.setState({ apiCall: 0 });
        this._callBingSearchApi(nextProps.dropzoneImgUrl);
        
      }
    }
    if(nextProps.CustomFetched && !nextProps.CustomFetching) {
      let CustomVisionConfidence;
      
      const messages = JSON.parse(nextProps.CustomVisionList.Message);
      const allcustomvision = this.state.descriptiontags;
      _.map(messages.Predictions, items => {
        let confidence = items.Probability;
        confidence = confidence * 100;
        if(confidence > 50) {
          allcustomvision.push(items.Tag);
          CustomVisionConfidence=confidence;

        }
      });
      CustomVisionConfidence=(CustomVisionConfidence.toFixed(3))/100;
      this.setState({cosmosDB:{confidence:CustomVisionConfidence,url:nextProps.imageUrl}});

      this.setState({ descriptiontags: allcustomvision, disableCustomVisionButton: true});
      
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

    if (_.isEmpty(nextProps.CustomVisionList) && nextProps.visionFetched && nextProps.ocrFetched || _.isEmpty(nextProps.CustomVisionList) && nextProps.visionFetched && nextProps.handFetched ) {
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
        // if (!_.isEmpty(nextProps.handList.recognitionResult)) {
        //   _.map(nextProps.handList.recognitionResult.lines, line => {
        //     allHandText.push(line.text);
        //   });
        // }
        if (!_.isEmpty(nextProps.handList.regions)) {
          _.map(nextProps.handList.regions, lines => _.map(lines.lines, item => _.map(item.words, text => allHandText.push(text.text))));
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
     
      
      if(this.state.gotoNextPage){
        let pre=this.state.previosurl;
        if(!_.isEmpty(this.state.previosurl)){
          cosmosDB.url=pre;
        }
        let hand=this.state.previosHandwrittenTags;
        if(!_.isEmpty(this.state.previosHandwrittenTags)){
          cosmosDB.handwrittentags=hand;
        }
        let ocr=this.state.previosOcrTags;
        if(!_.isEmpty(this.state.previosOcrTags)){
          cosmosDB.ocrtags=ocr;
        }
        this.setState({ cosmosDB, tags: allTags,descriptiontags:alldescriptiontags,captionvalue:allcaption});
       
      }
      else{
        this.setState({ cosmosDB, tags: allTags,descriptiontags:alldescriptiontags,captionvalue:allcaption,ocrvalue:orctags,handwrittenvalues:handwrittentags});
      }
    }

    if (!_.isEmpty(nextProps.intent)) {
      if (!_.isEmpty(nextProps.intent.entities)) {
        if (nextProps.intent.entities[0].type === 'showqueuedovergooditems') {
          console.log(nextProps);
          this._callApi('https://asgtagur.blob.core.windows.net/ai-test/DesPath/0131736369-63169.jpg');
          this._stopBOT();
        } else if (nextProps.intent.entities[0].type === 'showsearchpage') {
          this.setState({ gotoSearchPage: true });
        }
      }
    }

  }

  _stopBOT() {
    this.props.dispatch(stopbot());
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
    this._backtoHome();
  }

  _callBingSearchApi(query){
    
    const url='https://api.cognitive.microsoft.com/bing/v7.0/images/details?imgUrl='+query+'&modules=All&mkt=en-us&subscription-key=aa6e71cbaf9f49d2a12e7e03e09e698e';
    this.props.dispatch(BingSearch(url));
  } 

  _callBingTextApi(query){
    const url='https://api.cognitive.microsoft.com/bing/v7.0/images/search?q='+query+'&en-us&subscription-key=aa6e71cbaf9f49d2a12e7e03e09e698e';
    this.props.dispatch(BingSearch(url));
  }
  

  _callCustomVisionApi(query){
    const url = 'http://fedexovergoodservices.azurewebsites.net/api/Prediction?imageURL='+query;
    this.props.dispatch(customVision(url));
  }

  render() {

    const {BingSearchList, fetching, visionFetching, visionFetched } = this.props;
    
    if(this.state.gotoSearchPage) {
      return <Redirect to="/search-assets" />;
    }

    let images;

    if (!_.isEmpty(this.state.imagesArray)) {
      images = _.map(this.state.imagesArray, (f, i) => {
        const status = <div className="status"><button className="btn btn-primary" type="button" onClick={() => this._callApi(f.imgurl)}>View</button></div>;
        const style = { 'backgroundImage': `url(${f.imgurl})`};

        return (<li key={i} className="dropzoneItems"><div className="dzblock"><div className="thumb"><div className="image-thumb" style={style}></div></div>{status}</div></li>);
      });
    }
    
    let imageDetailModal;
    let visionFetchingProgress;
    if (visionFetching) {
      visionFetchingProgress = (<div className="vision-progress"><div className="status spinner">
                                  <div className="bounce1"></div>
                                  <div className="bounce2"></div>
                                  <div className="bounce3"></div>
                                </div></div>);
    }

    if (visionFetched && this.state.cosmosDB) {
      imageDetailModal = (
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
            bingSearch={this.state.gotoNextPage}
          />
      );
    }

    let pageData = (
      <HomePage fetching={fetching} images={images} onDrop={this._onDrop}/>
    );

    if(!_.isEmpty(BingSearchList.visuallySimilarImages) || this.state.gotoNextPage || !_.isEmpty(BingSearchList.value)) {
      // console.log(BingSearchList);
      pageData = <BingSearchPage bingSearchList={BingSearchList} callApiFromBing={this._callApiFromBing} cosmosDB={this.state.cosmosDB}  backtoHome={this._backtoHome}  onDrop={this._onDropBing}  onTextBingSearch={this. _onTextBingSearch}  onBingSearchTextChange={this._onBingSearchTextChange} />;
    }


    return (
      <div>
        {pageData}
        {imageDetailModal}
        {visionFetchingProgress}
      </div>
    );
  }
}

const initialImages = [
  {
    imgurl: 'https://asgtagur.blob.core.windows.net/ai-test/DesPath/0131736369-63169.jpg',
    name: 'image name1',
  },
  {
    imgurl: 'https://asgtagur.blob.core.windows.net/ai-test/DesPath/DesPath5019768_13.jpg',
    name: 'image name2',
  },
  {
    imgurl: 'https://asgtagur.blob.core.windows.net/ai-test/DesPath/5528403_23.jpg',
    name: 'image name3',
  },
  {
    imgurl: 'https://asgtagur.blob.core.windows.net/ai-test/DesPath/DesPath5017856_2.jpg',
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
  BingSearchList:PropTypes.object,
  BingSearchFetching:PropTypes.bool,
  BingSearchFetched:PropTypes.bool,
  arrayImage:PropTypes.array,
  previosurl:PropTypes.string,
  LuisList:PropTypes.array,
  Luisfetching:PropTypes.bool,
  Luisfetched:PropTypes.bool,
  intent: PropTypes.array,

};

export default Home;
