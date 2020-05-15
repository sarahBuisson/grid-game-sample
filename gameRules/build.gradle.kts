import groovy.json.*

buildscript {

}

plugins {
    id("java") //need for the "from"
    id("java-library")
    id("maven-publish")
    id("org.jetbrains.kotlin.multiplatform")

}

repositories {
    mavenCentral()
    mavenLocal()
    jcenter()
    maven(url = "https://kotlin.bintray.com/kotlinx")
}
val extt = extra.properties
println("extt")
println("" + extt::class)
println(extt)
kotlin {
    sourceSets {
        commonMain {
            kotlin.srcDir("src/main/kotlin")
            resources.srcDir("src/main/resource")
            dependencies {
                implementation("io.github.microutils:kotlin-logging-common:" + extt.get("kotlin_logging_version"))
                implementation("org.jetbrains.kotlin:kotlin-stdlib")
                implementation("org.jetbrains.kotlin:kotlin-test")
                implementation("org.jetbrains.kotlin:kotlin-stdlib-common")
                implementation("io.mockk:mockk:" + extt.get("mockkVersion"))

                implementation("org.jeasy:easy-rules-api:" + extt.get("rules_version"))
                /*implementation("org.jeasy:easy-rules-core:"+extt.get("rules_version"))*/
                implementation("org.jetbrains.kotlinx:kotlinx-serialization-runtime-common:" + extt.get("koltinxSerializationVersion"))


            }
        }


        jvm().compilations["main"].defaultSourceSet {
            dependencies {
                implementation("io.github.microutils:kotlin-logging:" + extt.get("kotlin_logging_version"))
                implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
                implementation("org.jetbrains.kotlin:kotlin-test-junit")
                implementation("org.jeasy:easy-rules-api-jvm:" + extt.get("rules_version"))
                implementation("org.jeasy:easy-rules-core-jvm:" + extt.get("rules_version"))
                implementation("org.jetbrains.kotlinx:kotlinx-serialization-runtime:" + extt.get("koltinxSerializationVersion"))

            }
        }

        jvm().compilations["test"].defaultSourceSet {//TODO : commonTest instead of jvmtest, wwhen mockk.js will be better at it
            kotlin.srcDir("src/test/kotlin")
            dependencies {

                implementation("org.jetbrains.kotlin:kotlin-test-common")
                implementation("org.jetbrains.kotlin:kotlin-test-annotations-common")
                implementation("io.mockk:mockk-common:" + extt.get("mockkVersion"))

            }
        }
        js().compilations["main"].defaultSourceSet {
            dependencies {
                implementation("org.jetbrains.kotlin:kotlin-stdlib-js")
                implementation("io.github.microutils:kotlin-logging-js:" + extt.get("kotlin_logging_version"))
                implementation("org.jeasy:easy-rules-api-npm:" + extt.get("rules_version"))
                implementation("org.jeasy:easy-rules-core-npm:" + extt.get("rules_version"))
                implementation("org.jetbrains.kotlinx:kotlinx-serialization-runtime-js:" + extt.get("koltinxSerializationVersion"))
                //implementation("org.jetbrains.kotlin:kotlin-test-js"
                //  implementation("io.mockk:mockk:1.7.17"
            }
        }

        js().compilations["test"].defaultSourceSet {

            dependencies {
                implementation("org.jetbrains.kotlin:kotlin-stdlib-js")
                implementation("io.github.microutils:kotlin-logging-js:" + extt.get("kotlin_logging_version"))
            }
        }
        metadata().compilations["main"].defaultSourceSet {
            dependencies {
                implementation("org.jeasy:easy-rules-core:" + extt.get("rules_version"))
            }
        }
    }

    jvm("jvm") {

        mavenPublication {
            artifactId = project.name + "-jvm"
        }
    }

    js() {
        mavenPublication {
            artifactId = project.name + "-js"
        }
    }
}