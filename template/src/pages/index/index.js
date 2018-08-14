import './index.styl'

import SampleComponent from '@/components/sample-component'

export default function () {
  return {
    view () {
      return (
        <div>
          <h2>{{ name }}</h2>
          <img src={ require('../../images/favicon.png') } />
          <SampleComponent />
        </div>
      )
    }
  }
}
