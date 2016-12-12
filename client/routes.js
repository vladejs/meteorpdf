/**
 * Created by vla2 on 12/12/16.
 */
import React from 'react'
import { FlowRouter } from 'meteor/kadira:flow-router-ssr'
import { mount } from 'react-mounter'

import Layout from './layout'
import Document from '/imports/ui/components/document'

FlowRouter.route('/', {
  name: 'home',
  action(params) {
    mount(Layout, {
      main: () => <Document />
    })
  }
});
