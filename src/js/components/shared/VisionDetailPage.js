import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TagsInput from 'react-tagsinput';


const VisionDetailPage = ({ ...props }) => {  
  let badges;
  if (props.search) {
    if (!_.isEmpty(props.cosmosDB.tags)) {
      badges = _.map(props.cosmosDB.tags, (item, i) => {
        return (<span key={i}><span className="badge badge-default">{item}</span>&nbsp;</span>);
      });
    } else {
      badges = 'No tags';
    }
  } else {
    badges = (<TagsInput className="inputtags" value={props.tagsValue} onChange={props.onTagsChange} />);
  }

  let decTags;
  if (props.search) {
    if (!_.isEmpty(props.cosmosDB.descriptiontags)) { 
      decTags = _.map(props.cosmosDB.descriptiontags, (item, i) => <span key={i}><span className="badge badge-default">{item}</span>&nbsp;</span>);
    } else {
      decTags = 'No tags';
    }
  } else {
    decTags = (<TagsInput className="inputtags" value={props.descriptionValue} onChange={props.onDescriptionTagsChange} />);
  }

  let confidence;
  if (props.cosmosDB.confidence) {
    confidence = Number(parseFloat(props.cosmosDB.confidence * 100).toFixed(0));
  }
  const style = {
    'width': `${confidence}%`,
  };
  let savebtn;
  if (props.onSave) {
    const text = JSON.parse(props.cosmosDB.captions);
    savebtn = (<div className="modal-footer d-flex justify-content-between">
                <div>
                  <button className="btn btn-secondary"  onClick={()=>props.onBingSearch(text.text)} >BingSearch</button>
                  <button className="btn btn-secondary" disabled={props.disableCustomVisionButton} onClick={()=>props.onCustomVisionSearch(props.cosmosDB.url)} >CustomVisionSearch</button>
                </div>
                <button className="btn btn-primary" onClick={props.onSave}>Save</button>
              </div>);
  }
  
  let captions;
  if (props.search) {
    if (!_.isEmpty(props.cosmosDB.captions)) {
      captions = <span>{props.cosmosDB.captions}</span>;
    }
  } else {
    captions = <input type="text" className="form-control" value={props.captionsValue} onChange={props.onCaptionChange} />;
  }

  let handwrittenText;
  if (props.search) {
    if (props.cosmosDB.handwrittentags) {
      handwrittenText = props.cosmosDB.handwrittentags;
    }
  } else {
    handwrittenText = <input placeholder="Add handwritten text..." type="text" className="form-control" value={props.handWritten} onChange={props.onHandWrittenChange}/>;
  }


  let contentText;
  if (props.search) {
    contentText = props.cosmosDB.ocrtags;
  } else {
    contentText = <input placeholder="add content Text..." type="text" className="form-control" value={props.ocrValues} onChange={props.onOcrChange}/>;
  }

  let notes;
  if (props.search) {
    notes = (<li>
              <div className="title">Notes</div>
              {props.cosmosDB.notes}
            </li>);
  } else {
    notes = (<li>
              <div className="title">Notes</div>
              <textarea placeholder="Add notes about this product" className="form-control" value={props.notesValue} onChange={props.onNotesChange} rows="2"></textarea>
            </li>);
  }

  const bgStyle = {
    'backgroundImage': `url(${ props.cosmosDB.url })`,
  };

  return (
    <div className="modal fade show visionModal">
      <div className="modal-dialog modal-lg">
        <div className="moda-content">
          <div className="modal-header">
            <h5 className="modal-title">Image Description</h5>
            <button type="button" className="close" onClick={props.onBack}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="moda-body">
            <div className="row">
              <div className="col-sm-6">
                <div className="product-image">
                  <div className="image" style={bgStyle}></div>
                </div>
                <div className="product-confidence">
                  <div className="display-progress">
                      <div className="title">Confidence:</div>
                      <div className="info">
                        <span className="perc">{confidence}%</span>
                        <span className="progress"><span className="progress-bar" style={style}></span></span>
                      </div>
                    </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div>
                  <ul>
                    
                    <li>
                      <div className="title">Captions:</div>
                      <div className="info">{captions}</div>
                    </li>
                    <li>
                      <div className="title">Tags:</div>
                      <div className="info">{badges}</div>
                    </li>
                    <li>
                      <div className="title">Description Tags:</div>
                      <div className="info">{decTags}</div>
                    </li>
                    <li>
                      <div className="title">Content</div>
                      <div className="info">{contentText}</div>
                    </li>
                    <li>
                      <div className="title">Hand Written Copy</div>
                      <div className="info">{handwrittenText}</div>
                    </li>
                    {notes}
                    
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {savebtn}
        </div>
      </div>
    </div>
  );
};

VisionDetailPage.propTypes = {
  onBack: PropTypes.func,
  cosmosDB: PropTypes.object,
  onSave: PropTypes.func,
  search: PropTypes.bool,
  captionsValue: PropTypes.string,
  onCaptionChange: PropTypes.func,
  ocrValues: PropTypes.string,
  onOcrChange: PropTypes.func,
  handWritten: PropTypes.string,
  onHandWrittenChange: PropTypes.func,
  notesValue: PropTypes.string,
  onNotesChange: PropTypes.func,
  tagsValue: PropTypes.array,
  onTagsChange: PropTypes.func,
  descriptionValue: PropTypes.array,
  onDescriptionTagsChange: PropTypes.func,
  onBingSearch:PropTypes.func,
  onCustomVisionSearch:PropTypes.func,
  disableCustomVisionButton: PropTypes.bool,
};

export default VisionDetailPage;
