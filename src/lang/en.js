export default {
    icon: {
        up: "Move the chat room to the top",
        down: "Move the chat room to the bottom",
        export: "Export Conversation",
        image: "Upload Image",
        language: "Switch Language",
    },
    placeholder: {
        question: "Enter your question here~",
        openai_key: "Please enter OpenAI KEY",
        role_name: "role name",
        session_name: "session name",
        model_name: "model name",
        slightly_name: "fine-tuned model name",
        file_name: "file name",
        suffix: "Text snippet to add at the end.",
        prompt: "set chat person settings",
        stop: "Token to stop generating text.",
        response_count: "Number of Answers Generated",
        trainingDataFileID: 'ID of training data file',
        validationDataFileID: 'ID of validation data file',
        modelName: 'Model name',
        trainingIterations: 'Number of training iterations',
        batchSize: 'Batch size',
        learningRate: 'Learning rate',
        ftsuffix: 'Suffix',
    },
    session: {
        title: "session",
        create: "create session",
        export: "Export the session list",
        import: "Import the session list",
        clear: "Clear the session list"
    },
    model: {
        title: "model",
        route: "route type",
        talk: "chat",
        saveSetting: "save Chat Setting",
        savePrompt: "save Prompt",
        resetSetting: "reset Chat Setting",
        resetPrompt: "reset Prompt",
        upButton: "up session",
        bottomButton: "bottom session",
        online_title: "online",
        online: "Online query after opening",
        suffix_title: "suffix",
        prompt_title: "Prompt",
        prompt: "A good system preset can make AI's answers more professional",
        suffix: "A text snippet to add at the end of the generated text",
        max_tokens_title: "Maximum word count",
        max_tokens: "Specifies the maximum number of words to generate, which cannot exceed 2048.",
        temperature_title: "Randomness（0-2）",
        temperature: "Specifies the randomness of the generated text, ranging from 0 to 2, where higher values are more diverse and creative, and lower values are more conservative and deterministic.",
        top_p_title: "Reserved word ratio（0-1）",
        top_p: "Specifies the proportion of words with the highest probability of being retained at each step, ranging from 0 to 1, similar to temperature, but more flexible and robust.",
        n_title: "Enable GPT responses to connect with context, but consume additional tokens",
        n: "Context length (0-10)",
        stream_title: "Stream output",
        stream: "Enable streaming output",
        echo_title: "Echo words",
        echo: "echo prompt word",
        stop_title: "Stop token",
        stop: "Sets the token at which the model stops generating text",
        frequency_penalty_title: "Word repetition[-2, 2]",
        frequency_penalty: "Specify the degree to reduce the probability of repeated words, the range is -2 to 2, the higher the more to avoid repetition.",
        presence_penalty_title: "Topic repetition[-2, 2]",
        presence_penalty: "Specify the degree to reduce the occurrence probability of repeated topics, ranging from -2 to 2, the higher means avoiding repetition.",
        max_results_title: "Specify the amount of online query data, it is not recommended to be too large.",
        max_results: "max_results"
    },
    slightly: {
        title: {
            whole: "FT",
            abbreviation: "FT"
        },
        retrieveFineTuning: 'Retrieve fine-tuning',
        cancelFineTuning: 'Cancel fine-tuning',
        hideCanceledFineTuning: 'Hide canceled fine-tuning',
        showCanceledFineTuning: 'Show canceled fine-tuning',
        deleteFineTuningModel: 'Delete fine-tuning model',
        createFineTuning: 'Create fine-tuning',
        create: 'Create',
        fileIDTrainingData: 'File ID containing training data',
        fileIDValidationData: 'File ID containing validation data',
        modelOptions: 'You can choose the model name from ada, babbage, curie, davinci, or the name of your own fine-tuned model.',
        epochs: 'By adjusting the number of n_epochs, you can control the training period and number of training times of the model, thereby affecting the performance and convergence speed of the model.',
        batchSize: 'A larger batch_size can speed up the training speed, stability, and generalization ability of the model, while a smaller batch_size can reduce memory and computing resource usage, and improve the performance of the model on test data.',
        fineTunedName: 'A string of up to 40 characters that will be added to the fine-tuned model name.',
        learningRate: 'You can control how many times the learning rate used during fine-tuning training is compared to the learning rate used by the pre-trained model. For example, if you set it to 2.0, the learning rate used during fine-tuning training will be twice that of the pre-trained model.',
        promptAttention: 'Setting a higher value will make the model pay more attention to prompts when generating text, while setting a lower value will make the model focus more on its own language model and generate more free text.'
    },
    file: {
        title: "file",
        upload: "Upload files",
        delete: "Delete Files",
        retrieve: "Retrieve files",
        view: "View file content"
    },
    image: {
        title: "image",
        production: "Production picture",
        production_title: "After opening, the content sent by the chat is information describing the picture",
        change: "Change picture",
        change_title: "After opening, upload the picture first, and then enter the prompt words to modify.",
        size: "Size",
        size_title: "The size of the image.",
        count: "Quantity",
        count_title: "The number of generated images."
    },
    audio: {
        title: "audio",
        to_text_title: "Speech to Text",
        autoRead: "auto read",
        read: "reading setting",
        volume: "reading volume",
        rate: "reading rate",
        pitch: "reading pitch:",
        lang: "lang type",
        type: "voice type",
        setting: "Please select your custom settings",
        to_text: "Speech to Text",
        language_title: "Translate speech or audio files from one or more source languages to a target language",
        language: "Language",
        temperature_title: "Specify the randomness of speech recognition, ranging from 0 to 1. Higher values indicate more diversity and creativity, while lower values indicate more conservatism and certainty.",
        temperature: "Randomness（0-1）",
    },
    role: {
        title: "role"
    },
    setting: {
        title: "set",
        Language: "Chinese Language"
    },
    file_card: {
        unknown: "unknown"
    },
    person_card: {
        train: "training...",
        cancel: "Cancelled"
    },
    util_js: {
        select: "Please select an image to upload!",
        path: "The path is incorrect!",
        notallowed: "This file type is not allowed to be uploaded. please upload ",
        type: " A file of type, the current file type is"
    },
    message: {
        start_recording: "Start recording~",
        create_image1: "Note: Questions and answers about photos will not be saved in the database",
        create_image2: "When refreshing the page or switching conversations, the photos will disappear!!",
        upload_image1: "Currently, only images in png format are supported.",
        upload_image2: "upload image",
        upload_image3: "Click on a conversation and enter your own needs in the input box to edit the photo",
        fail_audio: "Failed to get audio stream~",
        end_recording: "End recording~",
        edit_picture: "Edit picture mode: Please upload the picture in the upper right corner of the chat window first, and then send the modified content~",
        msg_empty: "Message cannot be empty~",
        model_del: "The model has been deleted or canceled...",
        valid_png: "Please upload a valid PNG file~",
        less_4M: "Please upload a file smaller than 4MB~",
        upload_complete: "Image upload completed, please give me a prompt to edit~",
        get_model_fail: "Failed to get model list~~",
        valid_json: "Please upload a valid JSON file~~",
        only_file: "Can only search for files~",
        fail_file: "Failed to search for files~",
        openai_free: "In order to reduce misuse, OpenAI free accounts cannot download fine-tuned training files~",
        only_del_file: "Can only delete files~",
        del_file_succ: "Congratulations on successfully deleting the file~",
        del_fail: "Failed to delete the file~",
        create_succ: "Congratulations on successfully creating fine-tuning~",
        create_fail: "Failed to create fine-tuning...",
        only_del_model: "Can only delete the model in fine-tuning~",
        del_model_succ: "Congratulations on successfully deleting the fine-tuned model~",
        del_fail_ing: "Failed to delete the fine-tuned model. The model is being trained or has been cancelled midway",
        only_cancel: "Can only cancel fine-tuned models in training~",
        cancel_succ: "Successfully canceled this model~",
        cancel_fail: "Failed to cancel the fine-tuned model~",
        only_model: "Can only search for fine-tuned models~",
        verify_model_fail: "Failed to search for fine-tuned models~",
        get_files_fail:"Failed to get file list~",
        get_roles_fail:"Failed to get role list~"
    },
    index: {
        detail: "The model behind ChatGPT v3.5",
        lastMsg: "The model behind ChatGPT v3.5",
        up_file_id: "The file has been uploaded successfully, and the file ID is",
        copy: ", and it has been copied for you~",
        file_id: "`File ID:`",
        file_name: "`File Name:`",
        file_size: "`File Size:`",
        obj: "`Object:`",
        status: "`Status:`",
        status_des: "`Status Description:`",
        target: "`Target:`",
        file_time: "`File Creation Time:`",
        task_id: "`Fine-tuning Task ID:`",
        task_type: "`Task Type:`",
        model_type: "`Model Type:`",
        task_time: "`Fine-tuning Task Creation Time:`",
        task_list: "`Fine-tuning Event List`\n",
        obj_log_info_time: "| Object | Log Level | Information | Creation Time |\n",
        model_id: "\n`Fine-tuned Model ID:`",
        args: "\n\n`Fine-tuning Arguments:`\n",
        item_setting: "| Property | Value Set |\n",
        user_group: "\n`User Group:`",
        results_null: "\n\n`Training Results File List: None`\n\n",
        results: "\n\n`Training Results File List:`\n\n",
        table_head: "| ID | File Name | File Size | Object | Status | \n",
        statu: "\n`Status:`",
        files_null: "\n\n`Training File List: None`\n\n",
        files: "\n\n`Training File List:`\n\n",
        verifys_null: "\n\n`Verification File List: None`\n\n",
        verifys: "\n\n`Verification File List:`\n\n",
        last_time: "\n`Last Update Timestamp:`",
    }
};
