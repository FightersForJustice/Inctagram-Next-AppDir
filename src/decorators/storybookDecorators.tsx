import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { useTranslations } from 'next-intl';

// https://storybook.js.org/addons/@gogaille/storybook-addon-next-router

export const ReduxStoreProviderDecorator = (story: any) => {
  return <Provider store={store}>{story()}</Provider>;
};

export const TranslateProviderDecorator = (StoryComponent: any) => {
    const t = useTranslations();
  return <StoryComponent translate={t} />;
};


export const ThemeDecorator = (StoryComponent: any) => {
  return (
    <div style={{ backgroundColor: '#000', padding: '10px' }}>
      <StoryComponent />
    </div>
  );
};
