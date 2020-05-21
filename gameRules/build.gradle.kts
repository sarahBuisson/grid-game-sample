import groovy.json.*
import org.gradle.api.tasks.testing.logging.TestLogEvent
import org.gradle.api.tasks.testing.logging.TestExceptionFormat
plugins {
    id("java") //need for the "from"
    id("java-library")
    id("maven-publish")
    id("org.jetbrains.kotlin.multiplatform")

}


val extt = extra.properties
kotlin {
    sourceSets {
        commonMain {
            kotlin.srcDir("src/main/kotlin")
            resources.srcDir("src/main/resource")
            //kotlin.srcDir("src/test/kotlin")//this line will be put in jvm config in order to only have the test running on the jvm
            dependencies {
                implementation("io.github.microutils:kotlin-logging-common:" + extt["kotlin_logging_version"])
                implementation("org.jetbrains.kotlin:kotlin-stdlib")
                implementation("org.jetbrains.kotlin:kotlin-test")
                implementation("org.jetbrains.kotlin:kotlin-stdlib-common")
                implementation("io.mockk:mockk:" + extt["mockkVersion"])

                implementation("org.jeasy:easy-rules-api:" + extt["rules_version"])
                implementation("org.jeasy:easy-rules-core:" + extt["rules_version"])
                /*implementation("org.jeasy:easy-rules-core:"+extt.get("rules_version"))*/
                implementation("org.jetbrains.kotlinx:kotlinx-serialization-runtime-common:" + extt["koltinxSerializationVersion"])


            }
        }


        jvm().compilations["main"].defaultSourceSet {
            dependencies {
                implementation("io.github.microutils:kotlin-logging:" + extt["kotlin_logging_version"])
                implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
                implementation("org.jetbrains.kotlin:kotlin-test-junit")
                implementation("org.jeasy:easy-rules-api-jvm:" + extt["rules_version"])
                implementation("org.jeasy:easy-rules-core-jvm:" + extt["rules_version"])
                implementation("org.jetbrains.kotlinx:kotlinx-serialization-runtime:" + extt["koltinxSerializationVersion"])

            }
        }

        jvm().compilations["test"].defaultSourceSet {//TODO : commonTest instead of jvmtest, wwhen mockk.js will be better at it
            kotlin.srcDir("src/test/kotlin")//In order to have only the test run in kotlin we put it here
            dependencies {

                implementation("org.jetbrains.kotlin:kotlin-test-common")
                implementation("org.jetbrains.kotlin:kotlin-test-annotations-common")
                implementation("io.mockk:mockk-common:" + extt["mockkVersion"])

            }
        }
        js().compilations["main"].defaultSourceSet {
            dependencies {
                implementation("org.jetbrains.kotlin:kotlin-stdlib-js")
                implementation("io.github.microutils:kotlin-logging-js:" + extt["kotlin_logging_version"])
                implementation("org.jeasy:easy-rules-api-npm:" + extt["rules_version"])
                implementation("org.jeasy:easy-rules-core-npm:" + extt["rules_version"])
                implementation("org.jetbrains.kotlinx:kotlinx-serialization-runtime-js:" + extt["koltinxSerializationVersion"])
                //implementation("org.jetbrains.kotlin:kotlin-test-js"
                //  implementation("io.mockk:mockk:1.7.17"
            }
        }

        js().compilations["test"].defaultSourceSet {

            dependencies {
                implementation("org.jetbrains.kotlin:kotlin-stdlib-js")
                implementation("io.github.microutils:kotlin-logging-js:" + extt["kotlin_logging_version"])
            }
        }
        metadata().compilations["main"].defaultSourceSet {
            dependencies {
                implementation("org.jeasy:easy-rules-api-common:" + extt["rules_version"])
                implementation("org.jeasy:easy-rules-core-common:" + extt["rules_version"])
            }
        }
    }

    jvm("jvm") {
        mavenPublication {
            artifactId = project.name + "-jvm"
        }
    }

    js() {
        browser()
        mavenPublication {
            artifactId = project.name + "-js"
        }
    }
}
