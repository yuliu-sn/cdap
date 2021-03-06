/*
 * Copyright © 2018 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
*/

import CreateProfileStore, {ACTIONS} from 'components/Cloud/Profiles/CreateView/CreateProfileStore';

function updateProfileLabel(label) {
  CreateProfileStore.dispatch({
    type: ACTIONS.updateProfileLabel,
    payload: {label}
  });
}

function updateProfileDescription(description) {
  CreateProfileStore.dispatch({
    type: ACTIONS.updateProfileDescription,
    payload: {description}
  });
}

function initializeProperties(provisionerJson = {}) {
  let configs = provisionerJson['configuration-groups'] || [];
  let properties = {};
  configs.forEach(config => {
    config.properties.forEach(prop => {
      let widgetAttributes = prop['widget-attributes'] || {};
      properties[prop.name] = {
        value: widgetAttributes.default || '',
        isEditable: true,
        required: prop.required || false
      };
    });
  });
  CreateProfileStore.dispatch({
    type: ACTIONS.initializeProperties,
    payload: {properties}
  });
}

function updateProperty(propName, propValue) {
  CreateProfileStore.dispatch({
    type: ACTIONS.updateProperty,
    payload: {
      propName, propValue
    }
  });
}

function togglePropertyLock(propName) {
  CreateProfileStore.dispatch({
    type: ACTIONS.togglePropertyLock,
    payload: {propName}
  });
}
function resetCreateProfileStore() {
  CreateProfileStore.dispatch({
    type: ACTIONS.reset
  });
}
export {
  updateProfileLabel,
  updateProfileDescription,
  initializeProperties,
  updateProperty,
  togglePropertyLock,
  resetCreateProfileStore
};
