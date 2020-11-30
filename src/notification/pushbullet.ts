import {Link, Store} from '../store/model';
import {Print, logger} from '../logger';
import PushBullet from '@jef/pushbullet';
import {configs} from '../config';

const pushbullet = configs.notification?.pushbullet;

export function sendPushbulletNotification(link: Link, store: Store) {
	if (pushbullet) {
		logger.debug('↗ sending pushbullet message');

		const pusher = new PushBullet(pushbullet.apiKey);

		pusher.note(
			{},
			Print.inStock(link, store),
			link.cartUrl ? link.cartUrl : link.url,
			(error: Error) => {
				if (error) {
					logger.error("✖ couldn't send pushbullet message", error);
				} else {
					logger.info('✔ pushbullet message sent');
				}
			}
		);
	}
}
