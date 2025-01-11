
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
import { getFirestore, getDoc, collection, doc } from 'firebase/firestore';
import { app } from '@/bd/firebase';

const bd = getFirestore(app);
async function getTranslationFireStore(locale: string) {
  const translationRef = doc(bd, 'translation', locale);
  const translationSnap = await getDoc(translationRef);
  const messages = translationSnap.data();

      
  return messages;
}
 
 
export default getRequestConfig(async ({ locale }) => {

  if (!locale|| !routing.locales.includes(locale as any)) {
      locale = routing.defaultLocale;
  }
  const messages = await getTranslationFireStore(locale);
  return { messages };
});