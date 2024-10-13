import pickle
from keras.preprocessing.image import load_img, img_to_array, ImageDataGenerator
from keras.applications.vgg16 import preprocess_input


IMG_DIM = 224
labels = ['битые пиксели',
          'замок',
          'отсутствует шуруп',
          'проблемы с клавишами',
          'сколы',
          'царапины']


def checkYolo(pathFile, pathModel):
    model = pickle.load(open(pathModel, 'rb'))

    #load the image
    my_image = load_img(pathFile, target_size=(IMG_DIM, IMG_DIM))

    #preprocess the image
    my_image = img_to_array(my_image)
    my_image = my_image.reshape((1, my_image.shape[0], my_image.shape[1], my_image.shape[2]))
    my_image = preprocess_input(my_image)

    #make the prediction
    prediction = model.predict(my_image)
    return labels[np.argmax([np.round(x) for x in prediction])]
