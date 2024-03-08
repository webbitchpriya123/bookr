
import notifee, { AndroidImportance,AndroidVisibility } from '@notifee/react-native';


export const PushNotification = async (remoteMessage ) => {
    const channelId = await notifee.createChannel({
        id: remoteMessage.messageId,
        name: 'pushnotification',
        sound: 'default',
        visibility: AndroidVisibility.PUBLIC,
        importance: AndroidImportance.HIGH,
    });
    await notifee.displayNotification({
        id: remoteMessage.messageId,
        title: remoteMessage.notification.title,
        // subtitle: remoteMessage.notification.body,
        body: remoteMessage.notification.body,
        data:{deeplink:"/Notification"} ,

        // data: remoteMessage.notification.body,
        // Link: https://notifee.app/react-native/reference/notificationandroid
        android: {
            channelId,
            // smallIcon: NOTIFICATION_ICON_RESOURCE_ID,
            importance: AndroidImportance.HIGH,
        },
        // Link: https://notifee.app/react-native/reference/notificationios
        ios: {
            foregroundPresentationOptions: {
                alert: true,
                badge: true,
                sound: true,
            },
        },
    });



}

